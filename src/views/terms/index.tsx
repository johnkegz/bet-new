import React from 'react';
import { useTranslation } from 'react-i18next';

const Terms = () => {
   const { t } = useTranslation();
  return (<div className="c16 doc-content">
            <p className="c2"><span className="c12">{t('termsPage.privacyPolicyForTREEOApp')}</span></p>
            <h1 className="c2" id="h.t1x8ky14vcb8"><span className="c11">{t('termsPage.privacyPolicy')}</span></h1>
            <p className="c1"><span className="c9 c7">{t('termsPage.lastUpdated')}</span></p>
            <p className="c1"><span className="c9 c7">{t('termsPage.policyDescription')}.</span></p>
            <p className="c1">
                <span className="c7">{t('termsPage.treeoDataCollection')} </span>
                <span className="c7">{t('termsPage.treeoDataCollectionDescription')}</span>
            </p>
            <h1 className="c2" id="h.3f1a5j1z14al"><span className="c11">{t('termsPage.interpretationAndDefinitions')}</span></h1>
            <h2 className="c2" id="h.ba27p2r4r5w1"><span className="c8">{t('termsPage.interpretation')}</span></h2>
            <p className="c1"><span className="c9 c7">{t('termsPage.interpretationDescription')}</span></p>
            <h2 className="c2" id="h.9bs5o7j9ni13"><span className="c8">{t('termsPage.definitions')}</span></h2>
            <p className="c1"><span className="c9 c7">{t('termsPage.definitionsDescription')}</span></p>
            <ul className="c6 lst-kix_b1hhe4bsz1da-0 start">
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.account')}</span><span className="c9 c7">&nbsp;{t('termsPage.accountDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.affiliate')}</span><span className="c9 c7">&nbsp;{t('termsPage.affiliateDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.application')}</span><span className="c9 c7">&nbsp;{t('termsPage.applicationDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.company')}</span><span className="c7">&nbsp;{t('termsPage.companyDescription')}</span><span className="c9 c7"><br />{t('termsPage.companyGDPRDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.country')}</span><span className="c9 c7">&nbsp;{t('termsPage.countryDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.dataController')}</span><span className="c9 c7">&nbsp;{t('termsPage.dataControllerDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.device')}</span><span className="c7">&nbsp;{t('termsPage.deviceDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.personalData')}</span><span className="c9 c7">&nbsp;{t('termsPage.personalDataDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.service')}</span><span className="c9 c7">&nbsp;{t('termsPage.serviceDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.serviceProvider')}</span><span className="c9 c7">&nbsp;{t('termsPage.serviceProviderDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.thirdPartySocialMediaService')}</span><span className="c9 c7">&nbsp;{t('termsPage.thirdPartySocialMediaServiceDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.usageData')}</span><span className="c9 c7">&nbsp;{t('termsPage.usageDataDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.you')}</span><span className="c9 c7">&nbsp;{t('termsPage.youDescription')}</span></li>
            </ul>

            <h1 className="c2" id="h.z1un5dakw3x7"><span className="c11">{t('termsPage.collectingAndUsingPersonalData')}</span></h1>
        <h2 className="c2" id="h.p0xmciwqzsb6"><span className="c8">{t('termsPage.typesOfDataCollected')}</span></h2>
        <h3 className="c2" id="h.rlke7stuzzll"><span className="c12">{t('termsPage.personalData')}</span></h3>
        <p className="c1"><span className="c9 c7">{t('termsPage.whileUsingService')}</span></p>
        <ul className="c6 lst-kix_8yz9doi0omjf-0 start">
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.emailAddress')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.firstNameAndLastName')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.companyName')}</span></li>
                <li className="c3 li-bullet-0"><span className="c7">{t('termsPage.companyCertificatesContractsAssessments')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.phoneNumber')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.address')}</span></li>
                <li className="c3 li-bullet-0"><span className="c7">{t('termsPage.usageData')}</span></li>
        </ul>
        <ul className="c6 lst-kix_oeu2ewnfangf-0 start">
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.usersIDCard')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.bankAccount')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.usersSocioEconomicsData')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.usersPictures')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.landOwnershipCertificate')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.taxDeclaration')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.picturesOfLand')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.picturesOfTrees')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.gpsLocation')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.deviceInformation')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.phoneNumber')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.mobileSensorsData')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.mobileAppUsageTracking')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.cloudUsageTracking')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.ipAddress')}</span></li>
        </ul>

        <h3 className="c2" id="h.pxlq2kxklbl0"><span className="c12"> {t('termsPage.usageData')}</span></h3>
        <p className="c1"><span className="c9 c7"> {t('termsPage.usageDataDescriptionService')} </span></p>
        <p className="c1"><span className="c9 c7"> {t('termsPage.usageDataDescriptionDevice')}</span></p>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.mobileDeviceAccess')}</span>
        </p>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.browserAccess')}</span>
        </p>
        <h3 className="c2" id="h.rkcs17qe2qob">
        <span className="c12">{t('termsPage.thirdPartySocialMedia')}</span>
        </h3>
        <p className="c1">
        <span className="c7 c9">{t('termsPage.socialMediaDescription')}</span>
        </p>
        <ul className="c6 lst-kix_kdm88li6wkdb-0 start">
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.google')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.facebook')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.instagram')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.twitter')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.linkedIn')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.whatsapp')}</span></li>
        </ul>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.socialMediaDataCollection')}</span>
        </p>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.additionalData')}</span>
        </p>
        <h3 className="c2" id="h.fjaju2i19r2x">
        <span className="c12">{t('termsPage.appDataCollection')}</span>
        </h3>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.appDataCollectionDescription')}</span>
        </p>
        <ul className="c6 lst-kix_6myhcooskqdt-0 start">
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.locationInformation')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.deviceMedia')}</span></li>
                <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.mobileSensors')}</span></li>
        </ul>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.appDataUsage')}</span>
        </p>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.dataAccessSettings')}</span>
        </p>
        <h2 className="c2" id="h.l3khgv2en0bd">
        <span className="c8">{t('termsPage.personalDataUsage')}</span>
        </h2>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.usagePurposes')}</span>
        </p>
        <ul className="c6 lst-kix_wk4w0ho78h30-0 start">
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.maintainService')}</span><span className="c9 c7">{t('termsPage.maintainServiceDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.accountManagement')}</span><span className="c9 c7">{t('termsPage.accountManagementDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.contractPerformance')}</span><span className="c7">{t('termsPage.contractPerformanceDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.contact')}</span><span className="c9 c7">{t('termsPage.contactDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.marketing')}</span><span className="c9 c7">{t('termsPage.marketingDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.requestManagement')}</span><span className="c9 c7">{t('termsPage.requestManagementDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.businessTransfers')}</span><span className="c9 c7">{t('termsPage.businessTransfersDescription')}</span></li>
                <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.otherPurposes')}</span><span className="c9 c7">{t('termsPage.otherPurposesDescription')}</span></li>
        </ul>

        <p className="c1"><span className="c9 c7">{t('termsPage.shareInfoDescription')}</span></p>
        <ul className="c6 lst-kix_6jcff1t39kv2-0 start">
        <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.withServiceProviders')}</span><span className="c9 c7">&nbsp;{t('termsPage.withServiceProvidersDescription')}</span></li>
        <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.forBusinessTransfers')}</span><span className="c9 c7">&nbsp;{t('termsPage.forBusinessTransfersDescription')}</span></li>
        <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.withAffiliates')}</span><span className="c9 c7">&nbsp;{t('termsPage.withAffiliatesDescription')}</span></li>
        <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.withBusinessPartners')}</span><span className="c9 c7">&nbsp;{t('termsPage.withBusinessPartnersDescription')}</span></li>
        <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.withOtherUsers')}</span><span className="c9 c7">&nbsp;{t('termsPage.withOtherUsersDescription')}</span></li>
        <li className="c3 li-bullet-0"><span className="c4">{t('termsPage.withYourConsent')}</span><span className="c9 c7">: {t('termsPage.withYourConsentDescription')}</span></li>
        </ul>
        <h2 className="c2" id="h.psn7k5y95fri"><span className="c8">{t('termsPage.retentionTitle')}</span></h2>
        <p className="c1"><span className="c9 c7">{t('termsPage.retentionDescription')}</span></p>
        <p className="c1"><span className="c9 c7">{t('termsPage.usageDataDescription1')}</span></p>
        <h2 className="c2" id="h.icwn8tghde61"><span className="c8">{t('termsPage.transferTitle')}</span></h2>
        <p className="c1"><span className="c9 c7">{t('termsPage.transferDescription')}</span></p>
        <p className="c1"><span className="c9 c7">{t('termsPage.transferConsentDescription')}</span></p>
        <p className="c1"><span className="c9 c7">{t('termsPage.transferControlDescription')}</span></p>
        <h2 className="c2" id="h.tlxxz59s50f"><span className="c8">{t('termsPage.deleteTitle')}</span></h2>
        <p className="c1"><span className="c9 c7">{t('termsPage.deleteDescription')}</span></p>
        <p className="c1"><span className="c9 c7">{t('termsPage.deleteServiceAbilityDescription')}</span></p>
        <p className="c1"><span className="c7">{t('termsPage.updateInfoDescription')}</span><span className="c9 c7"> {t('termsPage.updateInfoDescriptionContinued')}</span></p>
        <p className="c1"><span className="c9 c7">{t('termsPage.deleteNoteDescription')}</span></p>
        <h2 className="c2" id="h.4tt21c4tfaij"><span className="c8">{t('termsPage.disclosureTitle')}</span></h2>
        <h3 className="c2" id="h.rfuqoz9af23j"><span className="c12">{t('termsPage.businessTransactions')}</span></h3>
        <p className="c1"><span className="c9 c7">{t('termsPage.businessTransactionsDescription')}</span></p>
        <h3 className="c2" id="h.7pmevqud8xn9"><span className="c12">{t('termsPage.lawEnforcement')}</span></h3>
        <p className="c1"><span className="c9 c7">{t('termsPage.lawEnforcementDescription')}</span></p>
        <h3 className="c2" id="h.x3kns5f830ro"><span className="c12">{t('termsPage.otherLegalRequirements')}</span></h3>
        <p className="c1"><span className="c9 c7">{t('termsPage.otherLegalRequirementsDescription')}</span></p>
        <ul className="c6 lst-kix_6ie2t2jjnyf3-0 start">
        <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.complyLegalObligation')}</span></li>
        <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.protectRights')}</span></li>
        <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.investigateWrongdoing')}</span></li>
        <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.protectSafety')}</span></li>
        <li className="c3 li-bullet-0"><span className="c9 c7">{t('termsPage.protectLegalLiability')}</span></li>
        </ul>
        <h2 className="c2" id="h.kbtsxxnlvco0"><span className="c8">{t('termsPage.securityTitle')}</span></h2>
        <p className="c1"><span className="c9 c7">{t('termsPage.securityDescription')}</span></p>
        <h1 className="c2" id="h.a7cydz6t83zd"><span className="c11">{t('termsPage.detailedInfoTitle')}</span></h1>
        <p className="c1"><span className="c9 c7">{t('termsPage.serviceProvidersDescription')}</span></p>
        <h2 className="c2" id="h.hulmset43vdm"><span className="c8">{t('termsPage.analyticsTitle')}</span></h2>
        <p className="c1"><span className="c9 c7">{t('termsPage.analyticsDescription')}</span></p>
        <ul className="c6 lst-kix_v4w6xw5vosej-0 start">
        <li className="c3 li-bullet-0"><span className="c4">Google Analytics<br /></span><span className="c7">{t('termsPage.googleAnalyticsDescription')}</span></li>
        </ul>
        <h2 className="c2" id="h.yo7cij2dwqoc">
        <span className="c8">{t('termsPage.SMSAndEmailAuthentication')}</span>
        </h2>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.SMSAndEmailAuthenticationDescription')}</span>
        </p>
        <ul className="c6 lst-kix_g7317cc2ltae-0 start">
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.sendGrid')}</span>
        <span className="c7">{t('termsPage.sendGridPrivacyPolicy')}<a className="c10" href="https://sendgrid.com/policies/privacy/?gh_jid=623016">https://sendgrid.com/policies/privacy/?gh_jid=623016</a></span>
        </li>
        <li className="c2 c15 li-bullet-0">
        <h2 id="h.tk7n5fkguyke" style={{ display: "inline" }}>
        <span className="c4">{t('termsPage.twilio')}</span>
        <span className="c7">{t('termsPage.twilioPrivacyPolicy')}<a className="c10" href="https://www.twilio.com/legal/privacy">https://www.twilio.com/legal/privacy</a></span>
        <span className="c8">&nbsp;</span>
        </h2>
        </li>
        </ul>
        <h2 className="c2" id="h.doq437nc9rkx">
        <span className="c18">{t('termsPage.SMSAnd')}</span><span className="c8">{t('termsPage.EmailCommunications')}</span>
        </h2>

        <p className="c1">
        <span className="c9 c7">{t('termsPage.contactYouDescription')}</span>
        </p>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.smsEmailDescription')}</span>
        </p>
        <ul className="c6 lst-kix_g7317cc2ltae-0">
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.sendGrid')}</span>
        <span className="c7">{t('termsPage.sendGridPrivacyPolicy')}<a className="c10" href="https://sendgrid.com/policies/privacy/?gh_jid=623016">https://sendgrid.com/policies/privacy/?gh_jid=623016</a></span>
        </li>
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.twilio')}</span>
        <span className="c7">{t('termsPage.twilioPrivacyPolicy')}<a className="c10" href="https://www.twilio.com/legal/privacy">https://www.twilio.com/legal/privacy</a></span>
        </li>
        </ul>
        <h2 className="c2" id="h.i25ci8iw5zgu">
        <span className="c8">{t('termsPage.usagePerformanceMiscellaneous')}</span>
        </h2>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.thirdPartyServiceProviders')}</span>
        </p>
        <ul className="c6 lst-kix_afi8lqgh09nr-0 start">
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.freshDesk')}</span>
        <span className="c7">{t('termsPage.freshDeskDescription')}<a className="c10" href="https://www.freshworks.com/privacy/">https://www.freshworks.com/privacy/</a></span>
        </li>
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.googleWorkspace')}</span>
        <span className="c7">{t('termsPage.googleWorkspacePrivacyPolicy')}<a className="c10" href="https://cloud.google.com/terms/data-processing-addendum">https://cloud.google.com/terms/data-processing-addendum</a></span>
        </li>
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.googleCloudPlatform')}</span>
        <span className="c7">{t('termsPage.googleCloudPlatformPrivacyPolicy')}<a className="c10" href="https://cloud.google.com/terms/data-processing-addendum">https://cloud.google.com/terms/data-processing-addendum</a></span>
        </li>
        </ul>

        <h1 className="c2" id="h.jnp97pgf3s4b">
        <span className="c11">{t('termsPage.GDPRPrivacy')}</span>
        </h1>
        <h2 className="c2" id="h.tltk82ms73ec">
        <span className="c8">{t('termsPage.legalBasisForProcessing')}</span>
        </h2>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.processPersonalDataConditions')}</span>
        </p>
        <ul className="c6 lst-kix_yq9nz5boryhg-0 start">
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.consent')}:</span>
        <span className="c9 c7">&nbsp;{t('termsPage.consentDescription')}</span>
        </li>
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.performanceOfContract')}:</span>
        <span className="c9 c7">&nbsp;{t('termsPage.contractPerformanceDescriptionProvision')}</span>
        </li>
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.legalObligations')}:</span>
        <span className="c9 c7">&nbsp;{t('termsPage.legalObligationsDescription')}</span>
        </li>
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.vitalInterests')}:</span>
        <span className="c9 c7">&nbsp;{t('termsPage.vitalInterestsDescription')}</span>
        </li>
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.publicInterests')}:</span>
        <span className="c9 c7">&nbsp;{t('termsPage.publicInterestsDescription')}</span>
        </li>
        <li className="c3 li-bullet-0">
        <span className="c4">{t('termsPage.legitimateInterests')}:</span>
        <span className="c9 c7">&nbsp;{t('termsPage.legitimateInterestsDescription')}</span>
        </li>
        </ul>

        <p className="c1">
        <span className="c9 c7">{t('termsPage.clarificationLegalBasis')}</span>
        </p>
        <h2 className="c2" id="h.lhthi3ybeg08">
        <span className="c8">{t('termsPage.yourRightsUnderGDPR')}</span>
        </h2>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.confidentialityUndertake')}</span>
        </p>
        <p className="c1">
        <span className="c9 c7">{t('termsPage.rightsDescription')}</span>
        </p>

          <ul className="c6 lst-kix_3yjis4fw7pv6-0 start">
                <li className="c3 li-bullet-0">
                <span className="c4">{t('termsPage.requestAccess')}</span>
                <span className="c9 c7">&nbsp;{t('termsPage.accessDescription')}</span>
                </li>
                <li className="c3 li-bullet-0">
                <span className="c4">{t('termsPage.requestCorrection')}</span>
                <span className="c9 c7">&nbsp;{t('termsPage.correctionDescription')}</span>
                </li>
                <li className="c3 li-bullet-0">
                <span className="c4">{t('termsPage.objectToProcessing')}</span>
                <span className="c9 c7">&nbsp;{t('termsPage.objectDescription')}</span>
                </li>
                <li className="c3 li-bullet-0">
                <span className="c4">{t('termsPage.requestErasure')}</span>
                <span className="c9 c7">&nbsp;{t('termsPage.erasureDescription')}</span>
                </li>
                <li className="c3 li-bullet-0">
                <span className="c4">{t('termsPage.requestTransfer')}</span>
                <span className="c9 c7">&nbsp;{t('termsPage.transferDescription1')}</span>
                </li>
                <li className="c3 li-bullet-0">
                <span className="c4">{t('termsPage.withdrawConsent')}</span>
                <span className="c9 c7">&nbsp;{t('termsPage.withdrawConsentDescription')}</span>
                </li>
        </ul>



  <h2 className="c2" id="h.xedh9ameum7j">
  <span className="c8">{t('termsPage.exercisingOfYourGDPRDataProtectionRights')}</span>
</h2>
<p className="c1">
  <span className="c9 c7">{t('termsPage.exerciseRightsDescription')}</span>
</p>
<p className="c1">
  <span className="c9 c7">{t('termsPage.complainDataProtectionAuthority')}</span>
</p>
<h1 className="c2" id="h.6r21vruikq0">
  <span className="c11">{t('termsPage.childrensPrivacy')}</span>
</h1>

  <p className="c1"><span className="c9 c7"> {t('termsPage.ageRequirement')}</span></p>
  <p className="c1"><span className="c9 c7"> {t('termsPage.parentalConsent')}</span></p>
  <h1 className="c2" id="h.o9faim9kagp0"><span className="c11"> {t('termsPage.linksToOtherWebsites')}</span></h1>
  <p className="c1"><span className="c9 c7"> {t('termsPage.linksDescription')}</span></p>
  <p className="c1"><span className="c9 c7"> {t('termsPage.noControlDisclaimer')}</span></p>
  <h1 className="c2" id="h.1plx8gctgpoc"><span className="c11">{t('termsPage.changesToPrivacyPolicy')}</span></h1>
  <p className="c1"><span className="c9 c7"> {t('termsPage.updateNotification')}</span></p>
  <p className="c1"><span className="c9 c7"> {t('termsPage.updateEmailNotice')}</span></p>
  <p className="c1">
  <span className="c9 c7">{t('termsPage.reviewPrivacyPolicy')}</span>
</p>
<h1 className="c2" id="h.6uw26f8ue2t9">
  <span className="c11">{t('termsPage.contactUs')}</span>
</h1>
<p className="c1">
  <span className="c7">{t('termsPage.questionsAboutPolicy')}</span><span className="c7">:</span>
</p>
<ul className="c6 lst-kix_y5nx8ei8dx1p-0 start">
  <li className="c3 li-bullet-0">
    <span className="c7">{t('termsPage.contactByEmail')}</span>
  </li>
  <li className="c5 li-bullet-0">
    <span className="c7">{t('termsPage.contactByPost')}</span>
  </li>
</ul>

  <p className="c19"><span className="c9 c17"></span></p>
</div>)
}

export default Terms