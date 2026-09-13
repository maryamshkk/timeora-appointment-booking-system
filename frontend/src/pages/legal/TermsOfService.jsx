import React from "react";
import LegalPage, { LegalSection } from "../../components/public/legal/LegalPage";

function TermsOfService() {
    return (
        <LegalPage
            eyebrow="LEGAL"
            title="Terms of Service"
            lastUpdated="January 2026"
        >
            <p>
                These Terms of Service govern your use of Timeora. By creating
                an account or using our services, you agree to these terms. If
                you do not agree, please do not use Timeora.
            </p>

            <LegalSection heading="1. Eligibility">
                <p>
                    You must be at least 18 years old and able to enter into a
                    binding contract. By registering, you confirm that the
                    information you provide is accurate and complete.
                </p>
            </LegalSection>

            <LegalSection heading="2. Accounts">
                <p>
                    You are responsible for keeping your account credentials
                    confidential and for all activity under your account. Notify
                    us immediately if you suspect unauthorized access.
                </p>
            </LegalSection>

            <LegalSection heading="3. Acceptable Use">
                <p>
                    You agree not to misuse the platform — including accessing
                    it via unauthorized means, sending spam, or violating any
                    applicable law. We may suspend or terminate accounts that
                    violate these terms.
                </p>
            </LegalSection>

            <LegalSection heading="4. Payments">
                <p>
                    Timeora currently supports in-person (cash on reception)
                    payments. Online payment processing is not part of the
                    current service.
                </p>
            </LegalSection>

            <LegalSection heading="5. Service Availability">
                <p>
                    We aim for high availability but do not guarantee
                    uninterrupted service. Scheduled maintenance and unforeseen
                    outages may occur.
                </p>
            </LegalSection>

            <LegalSection heading="6. Limitation of Liability">
                <p>
                    To the maximum extent permitted by law, Timeora is not liable
                    for indirect, incidental, or consequential damages arising
                    from your use of the platform.
                </p>
            </LegalSection>

            <LegalSection heading="7. Changes">
                <p>
                    We may update these terms from time to time. Material changes
                    will be communicated by email or through the platform.
                    Continued use after changes constitutes acceptance.
                </p>
            </LegalSection>

            <LegalSection heading="8. Contact">
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

export default TermsOfService;