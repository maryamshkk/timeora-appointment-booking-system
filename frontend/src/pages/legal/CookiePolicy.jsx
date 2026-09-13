import React from "react";
import LegalPage, { LegalSection } from "../../components/public/legal/LegalPage";

function CookiePolicy() {
    return (
        <LegalPage
            eyebrow="LEGAL"
            title="Cookie Policy"
            lastUpdated="January 2026"
        >
            <p>
                This Cookie Policy explains how Timeora uses cookies and similar
                technologies. By continuing to use Timeora, you consent to the
                use of cookies as described here.
            </p>

            <LegalSection heading="1. What Are Cookies?">
                <p>
                    Cookies are small text files placed on your device that let a
                    website remember information between visits — such as your
                    login state, theme preference, or language choice.
                </p>
            </LegalSection>

            <LegalSection heading="2. Cookies We Use">
                <p>
                    <strong>Essential cookies</strong> keep you signed in and
                    secure the platform. <br />
                    <strong>Preference cookies</strong> remember settings like
                    dark mode or dashboard layout. <br />
                    <strong>Analytics cookies</strong> help us understand how the
                    platform is used so we can improve it.
                </p>
            </LegalSection>

            <LegalSection heading="3. Third-Party Cookies">
                <p>
                    We may allow trusted third parties, such as analytics
                    providers, to set cookies on your device. These providers are
                    bound by their own privacy policies.
                </p>
            </LegalSection>

            <LegalSection heading="4. Managing Cookies">
                <p>
                    You can control or delete cookies through your browser
                    settings. Disabling essential cookies may affect how Timeora
                    functions.
                </p>
            </LegalSection>

            <LegalSection heading="5. Contact">
                <p>
                    Questions? Reach us at{" "}
                    <a
                        href="mailto:timeorabytiemio@gmail.com"
                        className="font-bold text-navy transition hover:underline"
                    >
                        timeorabytiemio@gmail.com
                    </a>
                    .
                </p>
            </LegalSection>
        </LegalPage>
    );
}

export default CookiePolicy;