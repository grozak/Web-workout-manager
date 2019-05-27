package pl.workout.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private final Auth auth = new Auth();
    private final OAuth2 oAuth2 = new OAuth2();

    public static class Auth {
        private String tokenSecret;
        private long tokenExpirationMsec;

        public String getTokenSecret() {
            return tokenSecret;
        }

        public void setTokenSecret(String tokenSecret) {
            this.tokenSecret = tokenSecret;
        }

        public long getTokenExpirationMsec() {
            return tokenExpirationMsec;
        }

        public void setTokenExpirationMsec(long tokenExpirationMsec) {
            this.tokenExpirationMsec = tokenExpirationMsec;
        }
    }

    public static class OAuth2 {
        private List<String> authorizedRedirectUrls = new ArrayList<>();

        public List<String> getAuthorizedRedirectUrls() {
            return authorizedRedirectUrls;
        }

        public void setAuthorizedRedirectUrls(List<String> authorizedRedirectUrls) {
            this.authorizedRedirectUrls = authorizedRedirectUrls;
        }
    }

    public Auth getAuth() {
        return auth;
    }

    public OAuth2 getOAuth2() {
        return oAuth2;
    }
}
