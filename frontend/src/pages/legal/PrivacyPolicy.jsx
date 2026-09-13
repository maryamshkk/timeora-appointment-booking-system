import React from "react";
import LegalPage, { LegalSection } from "../../components/public/legal/LegalPage";

function PrivacyPolicy() {
    return (
        <LegalPage
            eyebrow="LEGAL"
            title="Privacy Policy"
            lastUpdated="January 2026"
        >
            <p>
                At Timeora, we take your privacy seriously. This policy explains
                what information we collect, how we use it, and the choices you
                have. It applies to company administrators, staff, and customers.
            </p>

            <LegalSection heading="1. Information We Collect">
                <p>
                    We collect information you provide directly — such as your
                    name, email, phone number, and company details — along with
                    technical data collected automatically, including IP address,
                    browser type, and usage data.
                </p>
            </LegalSection>

            <LegalSection heading="2. How We Use Your Information">
                <p>
                    We use your information to operate and improve Timeora,
                    provide customer support, send service-related notifications,
                    and comply with legal obligations. We do not sell your
                    personal data to third parties.
                </p>
            </LegalSection>

            <LegalSection heading="3. Data Sharing">
                <p>
                    We share data only with service providers who help us run the
                    platform (for example, hosting and email delivery), and only
                    to the extent necessary. All such providers are bound by
                    confidentiality agreements.
                </p>
            </LegalSection>

            <LegalSection heading="4. Data Retention">
                <p>
                    We retain your data for as long as your account is active or
                    as needed to provide services. You may request deletion of
                    your account and associated data at any time.
                </p>
            </LegalSection>

            <LegalSection heading="5. Your Rights">
                <p>
                    Depending on your location, you may have the right to access,
                    correct, delete, or export your personal data. To exercise
                    these rights, contact us at the address below.
                </p>
            </LegalSection>

            <LegalSection heading="6. Security">
                <p>
                    We use industry-standard safeguards — including encryption in
                    transit and at rest — to protect your data. No system is
                    perfectly secure, but we work continuously to keep your
                    information safe.
                </p>
            </LegalSection>

            <LegalSection heading="7. Contact">
                <p>
                    Questions about this policy? Reach us at{" "}
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

export default PrivacyPolicy;