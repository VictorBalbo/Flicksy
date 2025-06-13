import { TraktClientId } from "@/constants";
import * as AuthSession from "expo-auth-session";

const redirectUri = AuthSession.makeRedirectUri({
  scheme: "flicksy",
  path: "trakt-redirect",
  preferLocalhost: true,
});
console.log("Redirect URI:", redirectUri, TraktClientId);
export const loginWithTrakt = async () => {
  const discovery = {
    authorizationEndpoint: "https://api.trakt.tv/oauth/authorize",
    tokenEndpoint: "https://api.trakt.tv/oauth/token",
  };

  // Get the auth code
  const request = new AuthSession.AuthRequest({
    clientId: TraktClientId,
    responseType: AuthSession.ResponseType.Code,
    redirectUri,
    scopes: [],
    usePKCE: true,
  });

  await request.makeAuthUrlAsync(discovery);

  const result = await request.promptAsync(discovery);

  if (result.type !== "success" || !result.params.code) {
    throw new Error("Authorization failed or was cancelled");
  }

  // Exchange code for access token
  const token = await AuthSession.exchangeCodeAsync(
    {
      clientId: TraktClientId,
      code: result.params.code,
      redirectUri,
      extraParams: {
        code_verifier: request.codeVerifier ?? "",
      },
    },
    discovery
  );

  return token;
};
