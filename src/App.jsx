import { useState, useRef, useEffect } from "react";

// ─── Colors ─────────────────────────────────────────────────
const C = {
  bg:"#f0f4f8", card:"#ffffff", primary:"#0a6e6e", accent:"#00b4b4",
  light:"#e0f5f5", text:"#1a2e35", muted:"#6b8c99", border:"#d0e8e8",
  danger:"#e05c5c", warning:"#f0a500", success:"#2ea87e",
  grad:"linear-gradient(135deg,#0a6e6e 0%,#00b4b4 100%)",
};

// ─── Translations ────────────────────────────────────────────
const LANGS = {
  en: {
    // Nav
    appName:"What Do I Have?",
    navHistory:"History", navSubscribe:"Subscribe", navLogin:"Log In", navLogout:"Log Out", navBack:"← Back",
    // Intro
    freeQueriesLeft:n=>`✅ ${n} free quer${n===1?"y":"ies"} remaining`,
    nextQueryCost:p=>`💳 Next query: ${p}`,
    introTitle:"What Do I Have?",
    introSubtitle:"Enter your symptoms and get an AI-powered analysis based on WHO and current medical guidelines.",
    introWarning:"⚠️ Warning: This app is for informational purposes only. Always consult a healthcare professional for a definitive diagnosis. In emergencies call your local emergency number.",
    introStep1:"Enter your profile information",
    introStep2:"Select your symptoms",
    introStep3:"Get AI-powered analysis",
    btnStart:"Start →",
    btnSubscribe:"🔔 Subscribe",
    btnLogin:"Log In",
    loginTitle:"Welcome Back",
    loginSubtitle:"Log in with your registered email address",
    labelLoginEmail:"Your Email Address",
    placeholderLoginEmail:"example@email.com",
    btnLoginSubmit:"Log In →",
    loginErrorNotFound:"No account found with this email address.",
    loginSuccess:(n)=>`Welcome back, ${n}! 👋`,
    btnGoRegister:"Don't have an account? Subscribe",
    labelPassword:"Password",
    labelPasswordConfirm:"Confirm Password",
    placeholderPassword:"Min. 8 characters",
    placeholderPasswordConfirm:"Re-enter password",
    labelLoginPassword:"Password",
    placeholderLoginPassword:"Your password",
    rememberMe:"Remember me",
    forgotPassword:"Forgot password?",
    forgotTitle:"Reset Password",
    forgotSubtitle:"Enter your registered email address. Your password hint will be shown if found.",
    forgotEmailLabel:"Registered Email",
    forgotBtnSubmit:"Show Hint →",
    forgotHint:(h)=>`Your password hint: "${h}"`,
    forgotNoHint:"No hint was set for this account.",
    forgotNotFound:"No account found with this email.",
    btnBackToLogin:"← Back to Login",
    passwordHintLabel:"Password Hint (Optional)",
    passwordHintPlaceholder:"A hint to remember your password",
    subErrorPassword:"Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one punctuation mark.",
    subErrorPasswordMatch:"Passwords do not match.",
    loginErrorPassword:"Incorrect password.",
    showPassword:"Show",
    hidePassword:"Hide",
    // Step labels
    stepProfile:"Profile", stepSymptoms:"Symptoms", stepAnalysis:"Analysis",
    // Profile
    profileTitle:"Profile Information",
    profileSubtitle:"Enter basic information for a more accurate analysis",
    labelHeight:"Height (cm)", labelWeight:"Weight (kg)", labelGender:"Gender", labelCountry:"Country",
    genderF:"♀ Female", genderM:"♂ Male", genderN:"⚪ Prefer not to say",
    placeholderHeight:"e.g. 170", placeholderWeight:"e.g. 70",
    selectCountry:"Select country...",
    labelBMI:"BMI", labelBMICat:"Category",
    bmiUnder:"Underweight", bmiNormal:"Normal", bmiOver:"Overweight", bmiObese:"Obese",
    btnContinue:"Continue →",
    // Symptoms
    symptomsTitle:"Your Symptoms",
    symptomsSubtitle:"Select the symptoms you are experiencing — you can select multiple",
    freeLeft:n=>`${n} free quer${n===1?"y":"ies"} remaining`,
    paidQuery:p=>`This query is paid: ${p}`,
    labelAddSymptom:"Add a symptom not in the list",
    placeholderSymptom:"Type a symptom...",
    btnAdd:"+ Add",
    selectedSymptoms:n=>`${n} symptom${n===1?"":"s"} selected:`,
    btnAnalyze:"🔍 Analyze",
    btnPayAnalyze:p=>`💳 Pay & Analyze (${p})`,
    analyzing:"Analyzing...",
    // Results
    analysisSummary:"Analysis Summary",
    topMatch:"TOP MATCH",
    matchRate:"match rate",
    additionalIf:"More likely if these are also present:",
    doctorAdvice:"Doctor's Advice",
    disclaimer:"⚠️ Important: These results are for informational purposes only and do not replace a medical diagnosis. Please consult a healthcare professional for an accurate diagnosis. In case of emergency, call your local emergency number immediately.",
    btnNewAnalysis:"🔄 New Analysis",
    btnEmergency:"🚨 Report Emergency",
    btnShareLoc:"Share Location",
    btnLocShared:"✅ Location Shared",
    btnGettingLoc:"Getting location...",
    // Emergency banner
    emergencyTitle:"ATTENTION PLEASE!",
    emergencyBody:"Your condition may be a medical emergency.",
    emergencySubBody:"Please see a doctor immediately or call your local emergency number.",
    emergencyCall:label=>`📞 Call ${label}`,
    // Emergency card
    emergencyCardTitle:"Emergency Card",
    emergencyCardSub:"Read this information to the emergency operator",
    labelName:"👤 Name:", labelPhone:"📞 Phone:", labelLocation:"📍 Location:",
    labelSymptoms:"🩺 Symptoms:", labelDiagnosis:"⚠️ Possible Diagnosis:",
    gettingLocation:"Getting location...",
    locationFailed:"Could not get location",
    btnCallAmbulance:label=>`🚑 ${label} — Call Ambulance`,
    btnCallPolice:num=>`👮 ${num} — Police`,
    btnSendSMS:num=>`💬 Send SMS to ${num}`,
    btnWhatsApp:"🟢 Share via WhatsApp",
    btnMaps:"📍 Show on Map",
    btnClose:"Close",
    locationCopied:"Location copied to clipboard!",
    locationNotAvail:"Location unavailable. Please check browser location permissions.",
    // Subscribe
    memberBenefit:"🎁 Member Benefit",
    memberBenefitText:"First 3 queries completely free with membership! Without membership you only get 1 free query.",
    subscribeTitle:"Subscribe",
    subscribeSubtitle:"Register once, never enter your details again. Access your query history.",
    labelFirst:"First Name *", labelLast:"Last Name *", labelEmail:"Email *",
    labelPhone:"Phone Number", phoneSub:"(for emergency use)",
    labelBirthYear:"Birth Year",
    placeholderFirst:"Your first name", placeholderLast:"Your last name",
    placeholderEmail:"example@email.com", placeholderPhone:"5XX XXX XX XX",
    placeholderBirthYear:"1990",
    locationConsentTitle:"📍 Location Permission",
    locationConsentOptional:"(Optional)",
    locationConsentText:"I allow my location to be accessed when I use the emergency button. My location is only processed on my device during emergencies; it is not sent to or stored on servers.",
    kvkkTitle:"📋 Privacy Policy & Data Protection",
    kvkkBody1:appName=>`Under applicable data protection laws, your personal data (name, email, phone number, location and health information) is processed solely for the purpose of providing the services offered by ${appName}.`,
    kvkkBody2:"Your personal data will never be shared with, sold to, or transferred to any third-party institution, organization, or individual — whether for commercial purposes or any other reason.",
    kvkkBody3:"Your data is stored on secure servers only to meet technical infrastructure requirements; it is deleted or anonymized after the legal retention period expires.",
    kvkkBody4:"You have the right to access, correct, delete and object to the processing of your data under applicable law. You can use the app's contact channels to make requests.",
    kvkkConsent:"I have read and understood the Privacy Policy above and give my explicit consent to the processing of my personal data for the stated purposes.",
    btnRegister:"✅ Register — Get 3 Free Queries",
    btnContinueGuest:"Continue without account (1 free query)",
    subErrorRequired:"First name, last name and email are required.",
    subErrorEmail:"Please enter a valid email address.",
    subErrorKvkk:"You must accept the Privacy Policy to continue.",
    // History
    historyTitle:"My Query History",
    historyEmpty:"No query history yet.",
    historyEmergencyTag:"🚨 Emergency",
    // Payment
    payTitle:"Paid Query",
    paySubtitle:"You have used your free queries.",
    payFee:p=>`Fee for this query: ${p}`,
    payMemberFree:"Member (first 3 queries)", payMemberFreeVal:"Free",
    payMemberPaid:"Member (4th query onwards)", payGuestPaid:"Guest (after 1st)",
    btnPayStart:"Pay & Start Analysis →",
    btnUpgrade:"🔔 Subscribe — Get 3 Free Queries",
    btnCancel:"Cancel",
    processing:"Processing payment...",
    paySelectMethod:"Choose payment method",
    payMethodCard:"💳 Credit / Debit Card",
    payMethodCardSub:"All major cards accepted",
    payMethodGoogle:"🎮 Google Play Balance",
    payMethodGoogleSub:"Pay with your Play account",
    payMethodCarrier:"📱 Phone Bill",
    payMethodCarrierSub:"Charged to your mobile bill",
    payCardName:"Cardholder Name",
    payCardNumber:"Card Number",
    payCardExpiry:"MM/YY",
    payCardCvv:"CVV",
    payCardPlaceholderName:"Your full name",
    payCardPlaceholderNumber:"0000 0000 0000 0000",
    payConfirm:"Confirm & Analyze →",
    payGoogleInfo:"You will be redirected to Google Play to complete the payment. Return here after payment is confirmed.",
    payCarrierInfo:"The charge will appear on your next mobile phone bill. Supported carriers: Turkcell, Türk Telekom, Vodafone.",
    payCarrierBtn:"Charge to Phone Bill",
    payGoogleBtn:"Open Google Play",
    payMethodBank:"🏦 Bank Transfer (EFT/Havale)",
    payMethodBankSub:"Transfer to our account",
    payBankInfo:"After transferring, your query will be activated within 15 minutes.",
    payBankBtn:"I Transferred, Activate →",
    payBankRef:"Your reference code (add to transfer note):",
    // Bottom
    donateTitle:"Make a Donation",
    donateSubtitle:"Help us keep this app free. Every contribution makes a big difference.",
    btnDonate:"💛 Donate",
    donateAlert:sym=>`Thank you for your donation! ❤️\nPayment page coming soon.`,
    rateTitle:"Enjoying the app?",
    rateSubtitle:"Rate us on Google Play and help us improve!",
    btnRate:"Rate on Google Play",
    rateAlert:"Google Play page coming soon!",
    shareTitle:"Share with Friends",
    shareSubtitle:"Share What Do I Have? on social media",
    // Severity
    sevMild:"Mild", sevModerate:"Moderate", sevSevere:"Severe",
    urgEmergency:"🚨 Emergency", urgSoon:"⚡ Soon", urgRoutine:"📅 Routine",
    // Welcome
    welcome:(n,s)=>`👋 Welcome back, ${n} ${s}!`,
  },
  tr: {
    appName:"Neyim Var?",
    navHistory:"Geçmiş", navSubscribe:"Üye Ol", navLogin:"Giriş Yap", navLogout:"Çıkış", navBack:"← Geri",
    freeQueriesLeft:n=>`✅ ${n} ücretsiz sorgu hakkı kaldı`,
    nextQueryCost:p=>`💳 Sonraki sorgu: ${p}`,
    introTitle:"Neyim Var?",
    introSubtitle:"Belirtilerinizi girin, WHO ve güncel tıbbi kaynaklara dayalı yapay zeka analizi yapılsın.",
    introWarning:"⚠️ Uyarı: Bu uygulama yalnızca bilgilendirme amaçlıdır. Kesin tanı için mutlaka bir sağlık profesyoneliyle görüşün. Acil durumlarda ülkenizin acil servisini arayın.",
    introStep1:"Profil bilgilerinizi girin",
    introStep2:"Belirtilerinizi seçin",
    introStep3:"Yapay zeka analizi alın",
    btnStart:"Başla →",
    btnSubscribe:"🔔 Üye Ol",
    btnLogin:"Giriş Yap",
    loginTitle:"Tekrar Hoş Geldiniz",
    loginSubtitle:"Kayıtlı e-posta adresinizle giriş yapın",
    labelLoginEmail:"E-posta Adresiniz",
    placeholderLoginEmail:"ornek@email.com",
    btnLoginSubmit:"Giriş Yap →",
    loginErrorNotFound:"Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.",
    loginSuccess:(n)=>`Tekrar hoş geldiniz, ${n}! 👋`,
    btnGoRegister:"Hesabınız yok mu? Üye Olun",
    labelPassword:"Şifre",
    labelPasswordConfirm:"Şifre Tekrar",
    placeholderPassword:"Min. 8 karakter",
    placeholderPasswordConfirm:"Şifrenizi tekrar girin",
    labelLoginPassword:"Şifre",
    placeholderLoginPassword:"Şifreniz",
    rememberMe:"Beni hatırla",
    forgotPassword:"Şifremi unuttum",
    forgotTitle:"Şifre İpucu",
    forgotSubtitle:"Kayıtlı e-posta adresinizi girin. Hesabınız bulunursa şifre ipucunuz gösterilecektir.",
    forgotEmailLabel:"Kayıtlı E-posta",
    forgotBtnSubmit:"İpucunu Göster →",
    forgotHint:(h)=>`Şifre ipucunuz: "${h}"`,
    forgotNoHint:"Bu hesap için ipucu eklenmemiş.",
    forgotNotFound:"Bu e-posta ile kayıtlı hesap bulunamadı.",
    btnBackToLogin:"← Girişe Dön",
    passwordHintLabel:"Şifre İpucu (İsteğe Bağlı)",
    passwordHintPlaceholder:"Şifrenizi hatırlamak için bir ipucu",
    subErrorPassword:"Şifre en az 8 karakter olmalı, en az bir büyük harf, bir küçük harf ve bir noktalama işareti içermelidir.",
    subErrorPasswordMatch:"Şifreler eşleşmiyor.",
    loginErrorPassword:"Şifre hatalı.",
    showPassword:"Göster",
    hidePassword:"Gizle",
    stepProfile:"Profil", stepSymptoms:"Belirtiler", stepAnalysis:"Analiz",
    profileTitle:"Profil Bilgileri",
    profileSubtitle:"Daha doğru analiz için temel bilgilerinizi girin",
    labelHeight:"Boy (cm)", labelWeight:"Kilo (kg)", labelGender:"Cinsiyet", labelCountry:"Ülke",
    genderF:"♀ Kadın", genderM:"♂ Erkek", genderN:"⚪ Belirtmem",
    placeholderHeight:"örn: 170", placeholderWeight:"örn: 70",
    selectCountry:"Ülke seçin...",
    labelBMI:"BMI", labelBMICat:"Kategori",
    bmiUnder:"Zayıf", bmiNormal:"Normal", bmiOver:"Fazla Kilolu", bmiObese:"Obez",
    btnContinue:"Devam et →",
    symptomsTitle:"Belirtileriniz",
    symptomsSubtitle:"Yaşadığınız belirtileri seçin — birden fazla seçebilirsiniz",
    freeLeft:n=>`${n} ücretsiz sorgu hakkı kaldı`,
    paidQuery:p=>`Bu sorgu ücretli: ${p}`,
    labelAddSymptom:"Listede olmayan belirti ekle",
    placeholderSymptom:"Belirti yazın...",
    btnAdd:"+ Ekle",
    selectedSymptoms:n=>`Seçilen ${n} belirti:`,
    btnAnalyze:"🔍 Analiz Et",
    btnPayAnalyze:p=>`💳 Öde & Analiz Et (${p})`,
    analyzing:"Analiz ediliyor...",
    analysisSummary:"Analiz Özeti",
    topMatch:"EN YÜKSEK OLASILIK",
    matchRate:"uyum oranı",
    additionalIf:"Bunlar da varsa ihtimal artar:",
    doctorAdvice:"Doktor Tavsiyesi",
    disclaimer:"⚠️ Önemli Uyarı: Bu sonuçlar yalnızca ön bilgi amaçlıdır ve kesinlikle tıbbi tanı yerine geçmez. Doğru tanı için lütfen bir sağlık profesyoneliyle görüşün. Acil belirtiler yaşıyorsanız derhal ülkenizin acil servisini arayın.",
    btnNewAnalysis:"🔄 Yeni Analiz Yap",
    btnEmergency:"🚨 Acil Durum Bildir",
    btnShareLoc:"📍 Konumu Paylaş",
    btnLocShared:"✅ Konum Paylaşıldı",
    btnGettingLoc:"Konum alınıyor...",
    emergencyTitle:"LÜTFEN DİKKAT!",
    emergencyBody:"Durumunuz acil durum arz edebilir.",
    emergencySubBody:"Lütfen hemen bir doktora gidiniz veya acil servisi arayınız.",
    emergencyCall:label=>`📞 ${label} — Ara`,
    emergencyCardTitle:"Acil Durum Kartı",
    emergencyCardSub:"Bu bilgileri acil operatörüne okuyun",
    labelName:"👤 Ad Soyad:", labelPhone:"📞 Telefon:", labelLocation:"📍 Konum:",
    labelSymptoms:"🩺 Belirtiler:", labelDiagnosis:"⚠️ Olası Tanı:",
    gettingLocation:"Konum alınıyor...",
    locationFailed:"Konum alınamadı",
    btnCallAmbulance:label=>`🚑 ${label} — Ambulans Çağır`,
    btnCallPolice:num=>`👮 ${num} — Polis`,
    btnSendSMS:num=>`💬 ${num} Numarasına SMS Gönder`,
    btnWhatsApp:"🟢 WhatsApp ile Paylaş",
    btnMaps:"📍 Haritada Göster",
    btnClose:"Kapat",
    locationCopied:"Konum panoya kopyalandı!",
    locationNotAvail:"Konum alınamadı. Lütfen tarayıcı konum iznini kontrol edin.",
    memberBenefit:"🎁 Üye Avantajı",
    memberBenefitText:"Üyelik ile ilk 3 sorgu tamamen ücretsiz! Üyesiz kullanımda yalnızca 1 ücretsiz sorgu hakkınız var.",
    subscribeTitle:"Abone Ol",
    subscribeSubtitle:"Bir kez kayıt ol, bilgilerini bir daha girme. Geçmiş sorgularına eriş.",
    labelFirst:"Ad *", labelLast:"Soyad *", labelEmail:"E-posta *",
    labelPhone:"Telefon Numarası", phoneSub:"(Acil durum için)",
    labelBirthYear:"Doğum Yılı",
    placeholderFirst:"Adınız", placeholderLast:"Soyadınız",
    placeholderEmail:"ornek@email.com", placeholderPhone:"5XX XXX XX XX",
    placeholderBirthYear:"1990",
    locationConsentTitle:"📍 Konum İzni",
    locationConsentOptional:"(İsteğe Bağlı)",
    locationConsentText:"Acil durum butonunu kullandığımda konumumun alınmasına izin veriyorum. Konumum yalnızca acil an cihazımda işlenir, sunuculara gönderilmez veya depolanmaz.",
    kvkkTitle:"📋 Kişisel Verilerin Korunması (KVKK)",
    kvkkBody1:appName=>`6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, tarafımıza ilettiğiniz kişisel verileriniz (ad-soyad, e-posta, telefon numarası, konum ve sağlık bilgileri) yalnızca ${appName} hizmetlerinin sağlanması amacıyla işlenmektedir. Konum bilgisi yalnızca acil durum butonunu aktif ettiğinizde ve yalnızca cihazınızda işlenir; sunuculara iletilmez.`,
    kvkkBody2:"Kişisel verileriniz; hiçbir üçüncü taraf kurum, kuruluş veya kişiyle — ticari amaçla veya başka herhangi bir amaçla — kesinlikle paylaşılmayacak, satılmayacak ve aktarılmayacaktır.",
    kvkkBody3:"Verileriniz yalnızca teknik altyapı gereksinimlerini karşılamak üzere güvenli sunucularda saklanmakta; yasal saklama süresi dolduktan sonra silinmekte veya anonim hale getirilmektedir.",
    kvkkBody4:"KVKK'nın 11. maddesi uyarınca verilerinize erişim, düzeltme, silme ve işlemeye itiraz haklarına sahipsiniz. Talepleriniz için uygulamanın iletişim kanallarını kullanabilirsiniz.",
    kvkkConsent:"Yukarıdaki aydınlatma metnini okudum, anladım ve kişisel verilerimin belirtilen amaçlarla işlenmesine açık rızamı veriyorum.",
    btnRegister:"✅ Kayıt Ol — 3 Ücretsiz Sorgu Kazan",
    btnContinueGuest:"Üye olmadan devam et (1 ücretsiz sorgu)",
    subErrorRequired:"Ad, soyad ve e-posta zorunludur.",
    subErrorEmail:"Geçerli bir e-posta girin.",
    subErrorKvkk:"Devam edebilmek için gizlilik metnini onaylamanız gerekmektedir.",
    historyTitle:"Geçmiş Sorgularım",
    historyEmpty:"Henüz sorgu geçmişiniz yok.",
    historyEmergencyTag:"🚨 Acil",
    payTitle:"Ücretli Sorgu",
    paySubtitle:"Ücretsiz sorgu hakkınızı kullandınız.",
    payFee:p=>`Bu sorgu için ücret: ${p}`,
    payMemberFree:"Üye (ilk 3 sorgu)", payMemberFreeVal:"Ücretsiz",
    payMemberPaid:"Üye (4. sorgu ve sonrası)", payGuestPaid:"Üyesiz (1. sonrası)",
    btnPayStart:"Öde ve Analizi Başlat →",
    btnUpgrade:"🔔 Üye Ol — 3 Ücretsiz Sorgu Kazan",
    btnCancel:"İptal",
    processing:"Ödeme işleniyor...",
    paySelectMethod:"Ödeme yöntemini seçin",
    payMethodCard:"💳 Kredi / Banka Kartı",
    payMethodCardSub:"Tüm kartlar kabul edilir",
    payMethodGoogle:"🎮 Google Play Bakiyesi",
    payMethodGoogleSub:"Play hesabınızla ödeyin",
    payMethodCarrier:"📱 Telefon Faturası",
    payMethodCarrierSub:"Faturanıza yansıtılır",
    payCardName:"Kart Sahibinin Adı",
    payCardNumber:"Kart Numarası",
    payCardExpiry:"AA/YY",
    payCardCvv:"CVV",
    payCardPlaceholderName:"Ad Soyad",
    payCardPlaceholderNumber:"0000 0000 0000 0000",
    payConfirm:"Onayla ve Analiz Et →",
    payGoogleInfo:"Ödemeyi tamamlamak için Google Play'e yönlendirileceksiniz. Ödeme onaylandıktan sonra buraya dönün.",
    payCarrierInfo:"Ücret bir sonraki telefon faturanıza yansıtılacaktır. Desteklenen operatörler: Turkcell, Türk Telekom, Vodafone.",
    payCarrierBtn:"Faturama Yansıt",
    payGoogleBtn:"Google Play'i Aç",
    payMethodBank:"🏦 Havale / EFT",
    payMethodBankSub:"Banka hesabımıza transfer yapın",
    payBankInfo:"Transfer yaptıktan sonra sorgunu 15 dakika içinde aktive ediyoruz.",
    payBankBtn:"Havaleyi Yaptım, Aktive Et →",
    payBankRef:"Transfer açıklamasına yazacağınız referans kodunuz:",
    donateTitle:"Bağış Yapın",
    donateSubtitle:"Bu uygulamayı ücretsiz tutmamıza yardımcı olun. Her bağış büyük fark yaratır.",
    btnDonate:"💛 Bağış Yap",
    donateAlert:sym=>`Bağışınız için teşekkürler! ❤️\nÖdeme sayfası yakında aktif olacak.`,
    rateTitle:"Uygulamayı Beğendiniz mi?",
    rateSubtitle:"Google Play'de değerlendirin, gelişmemize katkı sağlayın!",
    btnRate:"Google Play'de Değerlendir",
    rateAlert:"Google Play sayfası yakında aktif olacaktır!",
    shareTitle:"Arkadaşlarınızla Paylaşın",
    shareSubtitle:"Neyim Var?'ı sosyal medyada paylaşarak herkese ulaştırın",
    sevMild:"Hafif", sevModerate:"Orta", sevSevere:"Ciddi",
    urgEmergency:"🚨 Acil", urgSoon:"⚡ Yakın Zamanda", urgRoutine:"📅 Rutin",
    welcome:(n,s)=>`👋 Hoş geldin, ${n} ${s}!`,
  },
  de: {
    appName:"Was habe ich?",
    navHistory:"Verlauf", navSubscribe:"Registrieren", navBack:"← Zurück",
    freeQueriesLeft:n=>`✅ ${n} kostenlose Anfrage${n===1?"":"n"} verbleibend`,
    nextQueryCost:p=>`💳 Nächste Anfrage: ${p}`,
    introTitle:"Was habe ich?",
    introSubtitle:"Geben Sie Ihre Symptome ein und erhalten Sie eine KI-gestützte Analyse.",
    introWarning:"⚠️ Warnung: Diese App dient nur zu Informationszwecken. Konsultieren Sie immer einen Arzt für eine genaue Diagnose. In Notfällen rufen Sie den Notruf Ihres Landes.",
    introStep1:"Profilinformationen eingeben",
    introStep2:"Symptome auswählen",
    introStep3:"KI-Analyse erhalten",
    btnStart:"Start →", btnSubscribe:"🔔 Registrieren",
    stepProfile:"Profil", stepSymptoms:"Symptome", stepAnalysis:"Analyse",
    profileTitle:"Profilinformationen", profileSubtitle:"Geben Sie grundlegende Informationen für eine genauere Analyse ein",
    labelHeight:"Größe (cm)", labelWeight:"Gewicht (kg)", labelGender:"Geschlecht", labelCountry:"Land",
    genderF:"♀ Weiblich", genderM:"♂ Männlich", genderN:"⚪ Keine Angabe",
    placeholderHeight:"z.B. 170", placeholderWeight:"z.B. 70", selectCountry:"Land auswählen...",
    labelBMI:"BMI", labelBMICat:"Kategorie",
    bmiUnder:"Untergewicht", bmiNormal:"Normal", bmiOver:"Übergewicht", bmiObese:"Adipositas",
    btnContinue:"Weiter →",
    symptomsTitle:"Ihre Symptome", symptomsSubtitle:"Wählen Sie Ihre Symptome — mehrere möglich",
    freeLeft:n=>`${n} kostenlose Anfrage${n===1?"":"n"} verbleibend`,
    paidQuery:p=>`Kostenpflichtige Anfrage: ${p}`,
    labelAddSymptom:"Symptom hinzufügen", placeholderSymptom:"Symptom eingeben...",
    btnAdd:"+ Hinzufügen", selectedSymptoms:n=>`${n} Symptom${n===1?"":"e"} ausgewählt:`,
    btnAnalyze:"🔍 Analysieren", btnPayAnalyze:p=>`💳 Bezahlen & Analysieren (${p})`,
    analyzing:"Wird analysiert...",
    analysisSummary:"Analysezusammenfassung", topMatch:"HÖCHSTE WAHRSCHEINLICHKEIT", matchRate:"Übereinstimmung",
    additionalIf:"Wahrscheinlicher wenn auch vorhanden:", doctorAdvice:"Ärztlicher Rat",
    disclaimer:"⚠️ Wichtiger Hinweis: Diese Ergebnisse dienen nur zur Information und ersetzen keine medizinische Diagnose. Konsultieren Sie einen Arzt. Im Notfall rufen Sie sofort den Notruf.",
    btnNewAnalysis:"🔄 Neue Analyse", btnEmergency:"🚨 Notfall melden",
    btnShareLoc:"📍 Standort teilen", btnLocShared:"✅ Standort geteilt", btnGettingLoc:"Standort wird ermittelt...",
    emergencyTitle:"ACHTUNG!", emergencyBody:"Ihr Zustand könnte ein Notfall sein.",
    emergencySubBody:"Bitte suchen Sie sofort einen Arzt auf oder rufen Sie den Notruf.",
    emergencyCall:label=>`📞 ${label} anrufen`,
    emergencyCardTitle:"Notfallkarte", emergencyCardSub:"Lesen Sie diese Informationen dem Notfalloperator vor",
    labelName:"👤 Name:", labelPhone:"📞 Telefon:", labelLocation:"📍 Standort:",
    labelSymptoms:"🩺 Symptome:", labelDiagnosis:"⚠️ Mögliche Diagnose:",
    gettingLocation:"Standort wird ermittelt...", locationFailed:"Standort nicht verfügbar",
    btnCallAmbulance:label=>`🚑 ${label} — Krankenwagen rufen`,
    btnCallPolice:num=>`👮 ${num} — Polizei`, btnSendSMS:num=>`💬 SMS an ${num} senden`,
    btnWhatsApp:"🟢 Per WhatsApp teilen", btnMaps:"📍 Auf Karte anzeigen", btnClose:"Schließen",
    locationCopied:"Standort in Zwischenablage kopiert!", locationNotAvail:"Standort nicht verfügbar.",
    memberBenefit:"🎁 Mitglieder-Vorteil", memberBenefitText:"Erste 3 Anfragen kostenlos mit Mitgliedschaft! Ohne Mitgliedschaft nur 1 kostenlose Anfrage.",
    subscribeTitle:"Registrieren", subscribeSubtitle:"Einmal registrieren, nie wieder Daten eingeben.",
    labelFirst:"Vorname *", labelLast:"Nachname *", labelEmail:"E-Mail *",
    labelPhone:"Telefonnummer", phoneSub:"(für Notfälle)",
    labelBirthYear:"Geburtsjahr",
    placeholderFirst:"Ihr Vorname", placeholderLast:"Ihr Nachname", placeholderEmail:"beispiel@email.com",
    placeholderPhone:"5XX XXX XX XX", placeholderBirthYear:"1990",
    locationConsentTitle:"📍 Standortberechtigung", locationConsentOptional:"(Optional)",
    locationConsentText:"Ich erlaube die Ermittlung meines Standorts, wenn ich die Notfalltaste verwende.",
    kvkkTitle:"📋 Datenschutzerklärung",
    kvkkBody1:n=>`Ihre persönlichen Daten werden ausschließlich zur Bereitstellung der Dienste von ${n} verarbeitet.`,
    kvkkBody2:"Ihre Daten werden niemals an Dritte weitergegeben, verkauft oder übertragen.",
    kvkkBody3:"Ihre Daten werden sicher gespeichert und nach Ablauf der gesetzlichen Aufbewahrungsfrist gelöscht.",
    kvkkBody4:"Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Widerspruch.",
    kvkkConsent:"Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu.",
    btnRegister:"✅ Registrieren — 3 kostenlose Anfragen",
    btnContinueGuest:"Ohne Konto fortfahren (1 kostenlose Anfrage)",
    subErrorRequired:"Vorname, Nachname und E-Mail sind erforderlich.",
    subErrorEmail:"Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    subErrorKvkk:"Sie müssen die Datenschutzerklärung akzeptieren.",
    historyTitle:"Mein Anfrageverlauf", historyEmpty:"Noch kein Anfrageverlauf.",
    historyEmergencyTag:"🚨 Notfall",
    payTitle:"Kostenpflichtige Anfrage", paySubtitle:"Ihre kostenlosen Anfragen wurden verbraucht.",
    payFee:p=>`Gebühr: ${p}`, payMemberFree:"Mitglied (erste 3)", payMemberFreeVal:"Kostenlos",
    payMemberPaid:"Mitglied (ab 4.)", payGuestPaid:"Gast (ab 2.)",
    btnPayStart:"Bezahlen & Analyse starten →", btnUpgrade:"🔔 Registrieren — 3 kostenlose Anfragen",
    btnCancel:"Abbrechen", processing:"Zahlung wird verarbeitet...",
    donateTitle:"Spenden", donateSubtitle:"Helfen Sie uns, diese App kostenlos zu halten.",
    btnDonate:"💛 Spenden", donateAlert:s=>`Danke für Ihre Spende! ❤️`,
    rateTitle:"Gefällt Ihnen die App?", rateSubtitle:"Bewerten Sie uns auf Google Play!",
    btnRate:"Auf Google Play bewerten", rateAlert:"Google Play Seite kommt bald!",
    shareTitle:"Mit Freunden teilen", shareSubtitle:"Teilen Sie Was habe ich? in sozialen Medien",
    sevMild:"Leicht", sevModerate:"Mittel", sevSevere:"Schwer",
    urgEmergency:"🚨 Notfall", urgSoon:"⚡ Bald", urgRoutine:"📅 Routine",
    welcome:(n,s)=>`👋 Willkommen, ${n} ${s}!`,
  },
  fr: {
    appName:"Qu'est-ce que j'ai?",
    navHistory:"Historique", navSubscribe:"S'inscrire", navBack:"← Retour",
    freeQueriesLeft:n=>`✅ ${n} requête${n===1?"":"s"} gratuite${n===1?"":"s"} restante${n===1?"":"s"}`,
    nextQueryCost:p=>`💳 Prochaine requête: ${p}`,
    introTitle:"Qu'est-ce que j'ai?",
    introSubtitle:"Entrez vos symptômes et obtenez une analyse basée sur l'OMS et les directives médicales actuelles.",
    introWarning:"⚠️ Avertissement: Cette application est à titre informatif uniquement. Consultez toujours un professionnel de santé. En cas d'urgence, appelez les services d'urgence.",
    introStep1:"Entrez vos informations de profil",
    introStep2:"Sélectionnez vos symptômes",
    introStep3:"Obtenez une analyse IA",
    btnStart:"Commencer →", btnSubscribe:"🔔 S'inscrire",
    stepProfile:"Profil", stepSymptoms:"Symptômes", stepAnalysis:"Analyse",
    profileTitle:"Informations de profil", profileSubtitle:"Entrez des informations de base pour une analyse plus précise",
    labelHeight:"Taille (cm)", labelWeight:"Poids (kg)", labelGender:"Sexe", labelCountry:"Pays",
    genderF:"♀ Féminin", genderM:"♂ Masculin", genderN:"⚪ Non précisé",
    placeholderHeight:"ex: 170", placeholderWeight:"ex: 70", selectCountry:"Sélectionner un pays...",
    labelBMI:"IMC", labelBMICat:"Catégorie",
    bmiUnder:"Insuffisance pondérale", bmiNormal:"Normal", bmiOver:"Surpoids", bmiObese:"Obèse",
    btnContinue:"Continuer →",
    symptomsTitle:"Vos Symptômes", symptomsSubtitle:"Sélectionnez vos symptômes — plusieurs possibles",
    freeLeft:n=>`${n} requête${n===1?"":"s"} gratuite${n===1?"":"s"} restante${n===1?"":"s"}`,
    paidQuery:p=>`Requête payante: ${p}`,
    labelAddSymptom:"Ajouter un symptôme", placeholderSymptom:"Tapez un symptôme...",
    btnAdd:"+ Ajouter", selectedSymptoms:n=>`${n} symptôme${n===1?"":"s"} sélectionné${n===1?"":"s"}:`,
    btnAnalyze:"🔍 Analyser", btnPayAnalyze:p=>`💳 Payer & Analyser (${p})`,
    analyzing:"Analyse en cours...",
    analysisSummary:"Résumé de l'analyse", topMatch:"CORRESPONDANCE LA PLUS ÉLEVÉE", matchRate:"correspondance",
    additionalIf:"Plus probable si également présent:", doctorAdvice:"Conseil médical",
    disclaimer:"⚠️ Avertissement important: Ces résultats sont à titre informatif uniquement et ne remplacent pas un diagnostic médical. Consultez un professionnel de santé. En cas d'urgence, appelez immédiatement.",
    btnNewAnalysis:"🔄 Nouvelle analyse", btnEmergency:"🚨 Signaler une urgence",
    btnShareLoc:"📍 Partager la position", btnLocShared:"✅ Position partagée", btnGettingLoc:"Localisation...",
    emergencyTitle:"ATTENTION!", emergencyBody:"Votre état peut être une urgence médicale.",
    emergencySubBody:"Veuillez consulter immédiatement un médecin ou appeler les secours.",
    emergencyCall:label=>`📞 Appeler ${label}`,
    emergencyCardTitle:"Carte d'urgence", emergencyCardSub:"Lisez ces informations à l'opérateur d'urgence",
    labelName:"👤 Nom:", labelPhone:"📞 Téléphone:", labelLocation:"📍 Position:",
    labelSymptoms:"🩺 Symptômes:", labelDiagnosis:"⚠️ Diagnostic possible:",
    gettingLocation:"Localisation en cours...", locationFailed:"Position indisponible",
    btnCallAmbulance:label=>`🚑 ${label} — Appeler ambulance`,
    btnCallPolice:num=>`👮 ${num} — Police`, btnSendSMS:num=>`💬 SMS au ${num}`,
    btnWhatsApp:"🟢 Partager via WhatsApp", btnMaps:"📍 Afficher sur la carte", btnClose:"Fermer",
    locationCopied:"Position copiée!", locationNotAvail:"Position indisponible.",
    memberBenefit:"🎁 Avantage membre", memberBenefitText:"3 premières requêtes gratuites avec l'abonnement! Sans abonnement, 1 seule requête gratuite.",
    subscribeTitle:"S'inscrire", subscribeSubtitle:"Inscrivez-vous une fois, ne ressaisissez jamais vos données.",
    labelFirst:"Prénom *", labelLast:"Nom *", labelEmail:"E-mail *",
    labelPhone:"Numéro de téléphone", phoneSub:"(pour les urgences)",
    labelBirthYear:"Année de naissance",
    placeholderFirst:"Votre prénom", placeholderLast:"Votre nom", placeholderEmail:"exemple@email.com",
    placeholderPhone:"5XX XXX XX XX", placeholderBirthYear:"1990",
    locationConsentTitle:"📍 Permission de localisation", locationConsentOptional:"(Optionnel)",
    locationConsentText:"J'autorise l'accès à ma position lors de l'utilisation du bouton d'urgence.",
    kvkkTitle:"📋 Politique de confidentialité",
    kvkkBody1:n=>`Vos données personnelles sont traitées uniquement pour fournir les services de ${n}.`,
    kvkkBody2:"Vos données ne seront jamais partagées, vendues ou transférées à des tiers.",
    kvkkBody3:"Vos données sont stockées en sécurité et supprimées après la période légale de conservation.",
    kvkkBody4:"Vous avez le droit d'accéder, corriger, supprimer vos données et vous opposer à leur traitement.",
    kvkkConsent:"J'ai lu et compris la politique de confidentialité et je consens au traitement de mes données.",
    btnRegister:"✅ S'inscrire — 3 requêtes gratuites",
    btnContinueGuest:"Continuer sans compte (1 requête gratuite)",
    subErrorRequired:"Prénom, nom et e-mail sont obligatoires.",
    subErrorEmail:"Veuillez entrer une adresse e-mail valide.",
    subErrorKvkk:"Vous devez accepter la politique de confidentialité.",
    historyTitle:"Mon historique", historyEmpty:"Pas encore d'historique.",
    historyEmergencyTag:"🚨 Urgence",
    payTitle:"Requête payante", paySubtitle:"Vos requêtes gratuites sont épuisées.",
    payFee:p=>`Frais: ${p}`, payMemberFree:"Membre (3 premières)", payMemberFreeVal:"Gratuit",
    payMemberPaid:"Membre (à partir de 4)", payGuestPaid:"Invité (à partir de 2)",
    btnPayStart:"Payer & démarrer l'analyse →", btnUpgrade:"🔔 S'inscrire — 3 requêtes gratuites",
    btnCancel:"Annuler", processing:"Paiement en cours...",
    donateTitle:"Faire un don", donateSubtitle:"Aidez-nous à garder cette application gratuite.",
    btnDonate:"💛 Faire un don", donateAlert:s=>`Merci pour votre don! ❤️`,
    rateTitle:"Vous aimez l'application?", rateSubtitle:"Évaluez-nous sur Google Play!",
    btnRate:"Évaluer sur Google Play", rateAlert:"Page Google Play bientôt disponible!",
    shareTitle:"Partager avec des amis", shareSubtitle:"Partagez sur les réseaux sociaux",
    sevMild:"Léger", sevModerate:"Modéré", sevSevere:"Grave",
    urgEmergency:"🚨 Urgence", urgSoon:"⚡ Bientôt", urgRoutine:"📅 Routine",
    welcome:(n,s)=>`👋 Bienvenue, ${n} ${s}!`,
  },
  es: {
    appName:"¿Qué tengo?",
    navHistory:"Historial", navSubscribe:"Registrarse", navBack:"← Atrás",
    freeQueriesLeft:n=>`✅ ${n} consulta${n===1?"":"s"} gratuita${n===1?"":"s"} restante${n===1?"":"s"}`,
    nextQueryCost:p=>`💳 Próxima consulta: ${p}`,
    introTitle:"¿Qué tengo?",
    introSubtitle:"Ingrese sus síntomas y obtenga un análisis basado en la OMS y directrices médicas actuales.",
    introWarning:"⚠️ Advertencia: Esta aplicación es solo informativa. Consulte siempre a un profesional de salud. En emergencias llame al número de emergencia de su país.",
    introStep1:"Ingrese su información de perfil",
    introStep2:"Seleccione sus síntomas",
    introStep3:"Obtenga análisis de IA",
    btnStart:"Comenzar →", btnSubscribe:"🔔 Registrarse",
    stepProfile:"Perfil", stepSymptoms:"Síntomas", stepAnalysis:"Análisis",
    profileTitle:"Información de perfil", profileSubtitle:"Ingrese información básica para un análisis más preciso",
    labelHeight:"Altura (cm)", labelWeight:"Peso (kg)", labelGender:"Género", labelCountry:"País",
    genderF:"♀ Femenino", genderM:"♂ Masculino", genderN:"⚪ Prefiero no decir",
    placeholderHeight:"ej: 170", placeholderWeight:"ej: 70", selectCountry:"Seleccionar país...",
    labelBMI:"IMC", labelBMICat:"Categoría",
    bmiUnder:"Bajo peso", bmiNormal:"Normal", bmiOver:"Sobrepeso", bmiObese:"Obeso",
    btnContinue:"Continuar →",
    symptomsTitle:"Sus Síntomas", symptomsSubtitle:"Seleccione sus síntomas — puede seleccionar varios",
    freeLeft:n=>`${n} consulta${n===1?"":"s"} gratuita${n===1?"":"s"} restante${n===1?"":"s"}`,
    paidQuery:p=>`Consulta de pago: ${p}`,
    labelAddSymptom:"Agregar síntoma", placeholderSymptom:"Escriba un síntoma...",
    btnAdd:"+ Agregar", selectedSymptoms:n=>`${n} síntoma${n===1?"":"s"} seleccionado${n===1?"":"s"}:`,
    btnAnalyze:"🔍 Analizar", btnPayAnalyze:p=>`💳 Pagar & Analizar (${p})`,
    analyzing:"Analizando...",
    analysisSummary:"Resumen del análisis", topMatch:"MAYOR PROBABILIDAD", matchRate:"coincidencia",
    additionalIf:"Más probable si también está presente:", doctorAdvice:"Consejo médico",
    disclaimer:"⚠️ Aviso importante: Estos resultados son solo informativos. Consulte a un médico para un diagnóstico preciso. En caso de emergencia, llame inmediatamente.",
    btnNewAnalysis:"🔄 Nuevo análisis", btnEmergency:"🚨 Reportar emergencia",
    btnShareLoc:"📍 Compartir ubicación", btnLocShared:"✅ Ubicación compartida", btnGettingLoc:"Obteniendo ubicación...",
    emergencyTitle:"¡ATENCIÓN!", emergencyBody:"Su condición puede ser una emergencia médica.",
    emergencySubBody:"Por favor busque atención médica de inmediato o llame a emergencias.",
    emergencyCall:label=>`📞 Llamar ${label}`,
    emergencyCardTitle:"Tarjeta de emergencia", emergencyCardSub:"Lea esta información al operador de emergencias",
    labelName:"👤 Nombre:", labelPhone:"📞 Teléfono:", labelLocation:"📍 Ubicación:",
    labelSymptoms:"🩺 Síntomas:", labelDiagnosis:"⚠️ Diagnóstico posible:",
    gettingLocation:"Obteniendo ubicación...", locationFailed:"Ubicación no disponible",
    btnCallAmbulance:label=>`🚑 ${label} — Llamar ambulancia`,
    btnCallPolice:num=>`👮 ${num} — Policía`, btnSendSMS:num=>`💬 SMS al ${num}`,
    btnWhatsApp:"🟢 Compartir por WhatsApp", btnMaps:"📍 Ver en mapa", btnClose:"Cerrar",
    locationCopied:"¡Ubicación copiada!", locationNotAvail:"Ubicación no disponible.",
    memberBenefit:"🎁 Beneficio de miembro", memberBenefitText:"¡Primeras 3 consultas gratuitas con membresía! Sin membresía solo 1 consulta gratuita.",
    subscribeTitle:"Registrarse", subscribeSubtitle:"Regístrese una vez, nunca vuelva a ingresar sus datos.",
    labelFirst:"Nombre *", labelLast:"Apellido *", labelEmail:"Correo *",
    labelPhone:"Número de teléfono", phoneSub:"(para emergencias)",
    labelBirthYear:"Año de nacimiento",
    placeholderFirst:"Su nombre", placeholderLast:"Su apellido", placeholderEmail:"ejemplo@email.com",
    placeholderPhone:"5XX XXX XX XX", placeholderBirthYear:"1990",
    locationConsentTitle:"📍 Permiso de ubicación", locationConsentOptional:"(Opcional)",
    locationConsentText:"Permito el acceso a mi ubicación cuando uso el botón de emergencia.",
    kvkkTitle:"📋 Política de privacidad",
    kvkkBody1:n=>`Sus datos personales se procesan únicamente para proporcionar los servicios de ${n}.`,
    kvkkBody2:"Sus datos nunca serán compartidos, vendidos ni transferidos a terceros.",
    kvkkBody3:"Sus datos se almacenan de forma segura y se eliminan después del período de retención legal.",
    kvkkBody4:"Tiene derecho a acceder, corregir, eliminar sus datos y oponerse a su procesamiento.",
    kvkkConsent:"He leído y entendido la política de privacidad y doy mi consentimiento al procesamiento de mis datos.",
    btnRegister:"✅ Registrarse — 3 consultas gratuitas",
    btnContinueGuest:"Continuar sin cuenta (1 consulta gratuita)",
    subErrorRequired:"Nombre, apellido y correo son obligatorios.",
    subErrorEmail:"Ingrese un correo electrónico válido.",
    subErrorKvkk:"Debe aceptar la política de privacidad.",
    historyTitle:"Mi historial", historyEmpty:"Todavía no hay historial.",
    historyEmergencyTag:"🚨 Emergencia",
    payTitle:"Consulta de pago", paySubtitle:"Ha agotado sus consultas gratuitas.",
    payFee:p=>`Tarifa: ${p}`, payMemberFree:"Miembro (primeras 3)", payMemberFreeVal:"Gratis",
    payMemberPaid:"Miembro (desde 4ª)", payGuestPaid:"Invitado (desde 2ª)",
    btnPayStart:"Pagar & iniciar análisis →", btnUpgrade:"🔔 Registrarse — 3 consultas gratuitas",
    btnCancel:"Cancelar", processing:"Procesando pago...",
    donateTitle:"Hacer una donación", donateSubtitle:"Ayúdenos a mantener esta aplicación gratuita.",
    btnDonate:"💛 Donar", donateAlert:s=>`¡Gracias por su donación! ❤️`,
    rateTitle:"¿Le gusta la aplicación?", rateSubtitle:"¡Califíquenos en Google Play!",
    btnRate:"Calificar en Google Play", rateAlert:"¡Página de Google Play próximamente!",
    shareTitle:"Compartir con amigos", shareSubtitle:"Comparta en redes sociales",
    sevMild:"Leve", sevModerate:"Moderado", sevSevere:"Grave",
    urgEmergency:"🚨 Emergencia", urgSoon:"⚡ Pronto", urgRoutine:"📅 Rutina",
    welcome:(n,s)=>`👋 Bienvenido/a, ${n} ${s}!`,
  },
};

// ─── Language meta ────────────────────────────────────────────
const LANG_OPTIONS = [
  { code:"tr", flag:"🇹🇷", label:"TR" },
  { code:"en", flag:"🇬🇧", label:"EN" },
];

// ─── Country → currency ($0.50 equiv) ────────────────────────
const CURRENCY = {
  "Türkiye":{ symbol:"₺", label:"4,99 ₺" },
  "Almanya":{ symbol:"€", label:"0,46 €" },
  "Amerika Birleşik Devletleri":{ symbol:"$", label:"$0.50" },
  "İngiltere":{ symbol:"£", label:"£0.40" },
  "Fransa":{ symbol:"€", label:"0,46 €" },
  "İtalya":{ symbol:"€", label:"0,46 €" },
  "İspanya":{ symbol:"€", label:"0,46 €" },
  "Hollanda":{ symbol:"€", label:"0,46 €" },
  "Belçika":{ symbol:"€", label:"0,46 €" },
  "Avusturya":{ symbol:"€", label:"0,46 €" },
  "İsviçre":{ symbol:"Fr", label:"Fr 0.45" },
  "Avustralya":{ symbol:"A$", label:"A$0.77" },
  "Kanada":{ symbol:"C$", label:"C$0.68" },
  "Japonya":{ symbol:"¥", label:"¥75" },
  "Çin":{ symbol:"¥", label:"¥3.62" },
  "Hindistan":{ symbol:"₹", label:"₹42" },
  "Brezilya":{ symbol:"R$", label:"R$2.53" },
  "Arjantin":{ symbol:"$", label:"$435" },
  "Meksika":{ symbol:"$", label:"$8.60" },
  "Rusya":{ symbol:"₽", label:"₽46" },
  "Polonya":{ symbol:"zł", label:"1,99 zł" },
  "Çek Cumhuriyeti":{ symbol:"Kč", label:"11,40 Kč" },
  "Macaristan":{ symbol:"Ft", label:"179 Ft" },
  "Yunanistan":{ symbol:"€", label:"0,46 €" },
  "Portekiz":{ symbol:"€", label:"0,46 €" },
  "İsveç":{ symbol:"kr", label:"5,20 kr" },
  "Norveç":{ symbol:"kr", label:"5,30 kr" },
  "Danimarka":{ symbol:"kr", label:"3,44 kr" },
  "Finlandiya":{ symbol:"€", label:"0,46 €" },
  "Diğer":{ symbol:"$", label:"$0.50" },
};
const getCurrency=(c)=>({symbol:"₺", label:"4,99 ₺"});

// ─── Emergency numbers ────────────────────────────────────────
const EMERGENCY = {
  "Türkiye":{ ambulance:"112", police:"155", fire:"110", label:"112 Acil" },
  "Almanya":{ ambulance:"112", police:"110", fire:"112", label:"112 Notruf" },
  "Amerika Birleşik Devletleri":{ ambulance:"911", police:"911", fire:"911", label:"911 Emergency" },
  "İngiltere":{ ambulance:"999", police:"999", fire:"999", label:"999 Emergency" },
  "Fransa":{ ambulance:"15", police:"17", fire:"18", label:"15 SAMU" },
  "İtalya":{ ambulance:"118", police:"113", fire:"115", label:"118 Emergenza" },
  "İspanya":{ ambulance:"112", police:"091", fire:"080", label:"112 Emergencias" },
  "Hollanda":{ ambulance:"112", police:"112", fire:"112", label:"112 Alarmnummer" },
  "Belçika":{ ambulance:"112", police:"101", fire:"100", label:"112 Urgence" },
  "Avusturya":{ ambulance:"144", police:"133", fire:"122", label:"144 Rettung" },
  "İsviçre":{ ambulance:"144", police:"117", fire:"118", label:"144 Sanitätsnotruf" },
  "Avustralya":{ ambulance:"000", police:"000", fire:"000", label:"000 Emergency" },
  "Kanada":{ ambulance:"911", police:"911", fire:"911", label:"911 Emergency" },
  "Japonya":{ ambulance:"119", police:"110", fire:"119", label:"119 救急" },
  "Çin":{ ambulance:"120", police:"110", fire:"119", label:"120 急救" },
  "Hindistan":{ ambulance:"108", police:"100", fire:"101", label:"108 Ambulance" },
  "Brezilya":{ ambulance:"192", police:"190", fire:"193", label:"192 SAMU" },
  "Arjantin":{ ambulance:"107", police:"911", fire:"100", label:"107 SAME" },
  "Meksika":{ ambulance:"911", police:"911", fire:"911", label:"911 Emergencias" },
  "Rusya":{ ambulance:"103", police:"102", fire:"101", label:"103 Скорая" },
  "Polonya":{ ambulance:"112", police:"997", fire:"998", label:"112 Pogotowie" },
  "Çek Cumhuriyeti":{ ambulance:"155", police:"158", fire:"150", label:"155 Záchranná" },
  "Macaristan":{ ambulance:"104", police:"107", fire:"105", label:"104 Mentők" },
  "Yunanistan":{ ambulance:"166", police:"100", fire:"199", label:"166 ΕΚΑΒ" },
  "Portekiz":{ ambulance:"112", police:"112", fire:"112", label:"112 Emergência" },
  "İsveç":{ ambulance:"112", police:"112", fire:"112", label:"112 SOS Alarm" },
  "Norveç":{ ambulance:"113", police:"112", fire:"110", label:"113 Ambulanse" },
  "Danimarka":{ ambulance:"112", police:"114", fire:"112", label:"112 Alarmcentralen" },
  "Finlandiya":{ ambulance:"112", police:"112", fire:"112", label:"112 Hätänumero" },
  "Diğer":{ ambulance:"112", police:"112", fire:"112", label:"112 Emergency" },
};
const getEmergency=(c)=>({ambulance:"112", police:"155", fire:"110", label:"112 Acil"});

const FREE_GUEST=1, FREE_MEMBER=3;
const ADMIN_EMAIL="nuh.kozan118@gmail.com";
const isAdmin=(email)=>typeof email==="string"&&email.trim().toLowerCase()===ADMIN_EMAIL.toLowerCase();
const validatePassword=(pw)=>{
  if(!pw||pw.length<8) return false;
  if(!/[A-Z]/.test(pw)) return false;
  if(!/[a-z]/.test(pw)) return false;
  if(!/[^A-Za-z0-9]/.test(pw)) return false;
  return true;
};
// ─── Supabase Bağlantısı ─────────────────────────────────────
// ⚠️ Aşağıdaki değerleri kendi Supabase proje ayarlarından girin
const SUPABASE_URL = "https://dfrliyalvbuycuvamrmk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmxpeWFsdmJ1eWN1dmFtcm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODc4NDAsImV4cCI6MjA5MDg2Mzg0MH0.Er23GqI71k1Iwy1uUUDJ1ACpWn3pmVDAC231p6gb4kw";

const sb = {
  headers: {
    "Content-Type": "application/json",
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": "Bearer " + SUPABASE_ANON_KEY,
  },
  // Kullanıcı kaydet veya güncelle
  upsertUser: async (user) => {
    try {
      console.log("upsertUser called:", user.email);
      const res = await fetch(SUPABASE_URL + "/rest/v1/users?on_conflict=email", {
        method: "POST",
        headers: { ...sb.headers, "Prefer": "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify({
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          password_hash: user.password,
          password_hint: user.passwordHint,
          phone: user.phone,
          gender: user.gender,
          country: user.country,
          birth_year: user.birthYear,
          height: user.height || "",
          weight: user.weight || "",
          location_ok: user.locationOk,
          kvkk_ok: user.kvkkOk,
          query_count: user.queryCount || 0,
        })
      });
      const data = await res.json();
      console.log("upsertUser response:", res.status, data);
      return data[0] || null;
    } catch(e) { console.error("upsertUser:", e); return null; }
  },
  // E-posta ile kullanıcı getir
  getUser: async (email) => {
    try {
      const res = await fetch(SUPABASE_URL + "/rest/v1/users?email=eq." + encodeURIComponent(email) + "&limit=1", {
        headers: sb.headers
      });
      const data = await res.json();
      return data[0] || null;
    } catch(e) { console.error("getUser:", e); return null; }
  },
  // Sorgu sayısını güncelle
  updateQueryCount: async (email, count) => {
    try {
      await fetch(SUPABASE_URL + "/rest/v1/users?email=eq." + encodeURIComponent(email), {
        method: "PATCH",
        headers: { ...sb.headers, "Prefer": "return=minimal" },
        body: JSON.stringify({ query_count: count })
      });
    } catch(e) { console.error("updateQueryCount:", e); }
  },
  // Boy/kilo güncelle
  updateProfile: async (email, height, weight) => {
    try {
      await fetch(SUPABASE_URL + "/rest/v1/users?email=eq." + encodeURIComponent(email), {
        method: "PATCH",
        headers: { ...sb.headers, "Prefer": "return=minimal" },
        body: JSON.stringify({ height, weight })
      });
    } catch(e) { console.error("updateProfile:", e); }
  },
  // Sorgu geçmişi kaydet
  saveHistory: async (email, entry) => {
    try {
      // Önce user_id al
      const user = await sb.getUser(email);
      if (!user) return;
      await fetch(SUPABASE_URL + "/rest/v1/query_history", {
        method: "POST",
        headers: { ...sb.headers, "Prefer": "return=minimal" },
        body: JSON.stringify({
          user_id: user.id,
          symptoms: entry.symptoms,
          profile: entry.profile,
          result: entry.result,
        })
      });
    } catch(e) { console.error("saveHistory:", e); }
  },
  // Sorgu geçmişi getir
  getHistory: async (email) => {
    try {
      const user = await sb.getUser(email);
      if (!user) return [];
      const res = await fetch(SUPABASE_URL + "/rest/v1/query_history?user_id=eq." + user.id + "&order=created_at.desc&limit=20", {
        headers: sb.headers
      });
      const data = await res.json();
      return data || [];
    } catch(e) { console.error("getHistory:", e); return []; }
  },
  // Bekleyen ödeme kaydet
  savePendingPayment: async (email, refCode, amount, method) => {
    try {
      await fetch(SUPABASE_URL + "/rest/v1/pending_payments", {
        method: "POST",
        headers: { ...sb.headers, "Prefer": "return=minimal" },
        body: JSON.stringify({ email, ref_code: refCode, amount, method, status: "pending" })
      });
    } catch(e) { console.error("savePendingPayment:", e); }
  },
};

const mem={
  get:(k)=>{ try{ const v=window.localStorage.getItem("nv_"+k); return v?JSON.parse(v):null; }catch{ return null; } },
  set:(k,v)=>{ try{ if(v===null){window.localStorage.removeItem("nv_"+k);}else{window.localStorage.setItem("nv_"+k,JSON.stringify(v));} }catch(e){} },
};

const countries=["Türkiye"];

const symptoms=["Ateş","Öksürük","Nefes darlığı","Baş ağrısı","Halsizlik / Yorgunluk","Boğaz ağrısı","Burun akması","Burun tıkanıklığı","Kas ağrısı","Eklem ağrısı","Karın ağrısı","Bulantı","Kusma","İshal","Kabızlık","Baş dönmesi","Çarpıntı","Göğüs ağrısı","Sırt ağrısı","Boyun ağrısı","Kulak ağrısı","Göz kızarıklığı","Cilt döküntüsü","Kaşıntı","Şişlik / Ödem","İştah kaybı","Kilo kaybı","Gece terlemesi","Üşüme / Titreme","Uyku bozukluğu","Konsantrasyon güçlüğü","Hafıza sorunları","Depresif his","Anksiyete","Sık idrara çıkma","İdrarda yanma","Kan görülmesi (idrar/dışkı)","Sarılık","Ağız kuruluğu","Aşırı susama"];

const STYLE=`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#f0f4f8;font-family:'DM Sans',sans-serif;}
  .fi{animation:fi .5s ease forwards;}
  @keyframes fi{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes ep{0%,100%{box-shadow:0 0 0 0 rgba(224,92,92,.55);}60%{box-shadow:0 0 0 14px rgba(224,92,92,0);}}
  @keyframes modalIn{from{opacity:0;transform:scale(.94)translateY(20px);}to{opacity:1;transform:scale(1)translateY(0);}}
  .spin{animation:spin 1s linear infinite;}
  .ep{animation:ep 1.8s ease-in-out infinite;}
  .modal{animation:modalIn .3s ease forwards;}
  input,select,textarea{width:100%;padding:12px 16px;border:1.5px solid #d0e8e8;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:15px;color:#1a2e35;background:#fff;outline:none;transition:border .2s,box-shadow .2s;}
  input:focus,select:focus,textarea:focus{border-color:#00b4b4;box-shadow:0 0 0 3px rgba(0,180,180,.12);}
  input::placeholder,textarea::placeholder{color:#6b8c99;}
  button{cursor:pointer;font-family:'DM Sans',sans-serif;}
  ::-webkit-scrollbar{width:6px;}
  ::-webkit-scrollbar-thumb{background:#d0e8e8;border-radius:3px;}
`;

export default function App() {
  const [lang, setLang]   = useState(()=>mem.get("lang")||"tr");
  const t = (k, ...args) => {
    const val = LANGS[lang]?.[k] ?? LANGS["en"]?.[k];
    return typeof val === "function" ? val(...args) : (val ?? k);
  };

  const [view,   setView]   = useState("home"); // home|subscribe|history|login|graph|blood|radio|admin
  const [subscriber,setSub] = useState(()=>mem.get("rememberedUser")||mem.get("subscriber")?mem.get("rememberedUser"):null);
  const [subForm,setSubForm]= useState({firstName:"",lastName:"",email:"",gender:"",country:"Türkiye",birthYear:"",phone:"",password:"",passwordConfirm:"",passwordHint:"",locationOk:false,kvkkOk:false});
  const [subError,setSubError]=useState("");
  const [loginEmail,setLoginEmail]=useState("");
  const [loginPassword,setLoginPassword]=useState("");
  const [loginRemember,setLoginRemember]=useState(false);
  const [loginError,setLoginError]=useState("");
  const [showLoginPw,setShowLoginPw]=useState(false);
  const [showSubPw,setShowSubPw]=useState(false);
  const [forgotView,setForgotView]=useState(false);
  const [forgotEmail,setForgotEmail]=useState("");
  const [forgotMsg,setForgotMsg]=useState("");
  const [forgotIsError,setForgotIsError]=useState(false);
  const [history,setHistory]= useState(()=>mem.get("history")||[]);
  const [expandedIdx,setExpandedIdx]=useState(null);
  const [queryCount,setQueryCount]=useState(()=>mem.get("queryCount")||0);
  const [showPayModal,setShowPayModal]=useState(false);
  const [payPending,setPayPending]=useState(false);
  const [payMethod,setPayMethod]=useState(""); // "card"|"googleplay"|"carrier"
  const [payQty,setPayQty]=useState(1); // kaç sorgu satın alınacak
  const [step,setStep]=useState(0);
  const [profile,setProfile]=useState(()=>({height:mem.get("savedHeight")||"",weight:mem.get("savedWeight")||"",gender:"",country:"Türkiye"}));
  const [selSym,setSelSym]=useState([]);
  const [customSym,setCustomSym]=useState("");
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [error,setError]=useState("");
  const [location,setLocation]=useState(null);
  const [locLoading,setLocLoading]=useState(false);
  const [showEmergencyCard,setShowEmergencyCard]=useState(false);
  const topRef=useRef(null);

  useEffect(()=>{ topRef.current?.scrollIntoView({behavior:"smooth"}); },[view,step]);
  useEffect(()=>{
    if(subscriber) setProfile(p=>({...p,gender:p.gender||subscriber.gender||"",country:p.country||subscriber.country||""}));
  },[subscriber]);

  const changeLang=(code)=>{ setLang(code); mem.set("lang",code); setShowLangMenu(false); };

  const adminUser   = subscriber&&isAdmin(subscriber.email);
  const freeLimit   = subscriber?FREE_MEMBER:FREE_GUEST;
  const isFreeQuery = adminUser || queryCount<freeLimit;
  const freeRemaining= adminUser ? Infinity : Math.max(0,freeLimit-queryCount);
  const countryForPrice=profile.country||subscriber?.country||"Diğer";
  const currency=getCurrency(countryForPrice);

  const addHistory=(entry)=>{
    const h=[entry,...history].slice(0,20); setHistory(h); mem.set("history",h);
    // Supabase'e kaydet (arka planda)
    if(subscriber) sb.saveHistory(subscriber.email, entry);
  };
  const toggleSym=(s)=>setSelSym(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s]);
  const addCustom=()=>{ const t2=customSym.trim(); if(t2&&!selSym.includes(t2)){setSelSym(p=>[...p,t2]);setCustomSym("");} };
  const profileOk=profile.gender&&profile.country;
  const symptomsOk=selSym.length>0;
  const hasEmergency=result?.diagnoses?.some(d=>d.urgency==="acil");

  const resetApp=()=>{ setStep(0);setResult(null);setSelSym([]);setError(""); setProfile({height:mem.get("savedHeight")||"",weight:mem.get("savedWeight")||"",gender:subscriber?.gender||"",country:subscriber?.country||"Türkiye"}); };

  const getLocation=()=>{
    setLocLoading(true);
    return new Promise((resolve)=>{
      if(!navigator.geolocation){setLocLoading(false);resolve(null);return;}
      navigator.geolocation.getCurrentPosition(
        async(pos)=>{
          const{latitude:lat,longitude:lng}=pos.coords;
          let address=lat.toFixed(4)+", "+lng.toFixed(4);
          try{ const r=await fetch("https://nominatim.openstreetmap.org/reverse?lat="+lat+"&lon="+lng+"&format=json"); const d=await r.json(); if(d.display_name)address=d.display_name; }catch(e){}
          const loc={lat,lng,address}; setLocation(loc); setLocLoading(false); resolve(loc);
        },
        ()=>{setLocLoading(false);resolve(null);},
        {enableHighAccuracy:true,timeout:10000}
      );
    });
  };

  const handleEmergency=async()=>{ setShowEmergencyCard(true); if(!location)await getLocation(); };

  const handleLogin=async()=>{
    setLoginError("");
    // Her zaman Supabase'den taze veri çek
    const dbUser = await sb.getUser(loginEmail.trim());
    let saved = null;
    if(dbUser){
      saved = {
        firstName:dbUser.first_name, lastName:dbUser.last_name,
        email:dbUser.email, gender:dbUser.gender, country:dbUser.country,
        birthYear:dbUser.birth_year, phone:dbUser.phone||"",
        locationOk:dbUser.location_ok, kvkkOk:dbUser.kvkk_ok,
        password:dbUser.password_hash, passwordHint:dbUser.password_hint||"",
      };
      mem.set("subscriber",saved);
      // Supabase'den taze query_count al
      setQueryCount(dbUser.query_count||0);
      mem.set("queryCount",dbUser.query_count||0);
    } else {
      // Supabase'de yoksa localStorage'a bak
      saved = mem.get("subscriber");
    }
    if(!saved||saved.email.trim().toLowerCase()!==loginEmail.trim().toLowerCase()){
      setLoginError(t("loginErrorNotFound")); return;
    }
    if(saved.password&&saved.password!==loginPassword){
      setLoginError(t("loginErrorPassword")); return;
    }
    if(loginRemember){ mem.set("rememberedUser",saved); }
    else { mem.set("rememberedUser",null); }
    setSub(saved); setView("home"); setLoginEmail(""); setLoginPassword("");
  };

  const handleForgot=()=>{
    setForgotMsg("");
    const saved=mem.get("subscriber");
    if(!saved||saved.email.trim().toLowerCase()!==forgotEmail.trim().toLowerCase()){
      setForgotIsError(true); setForgotMsg(t("forgotNotFound")); return;
    }
    setForgotIsError(false);
    if(saved.passwordHint){ setForgotMsg(t("forgotHint",saved.passwordHint)); }
    else { setForgotMsg(t("forgotNoHint")); }
  };

  const handleSubscribe=async()=>{
    const{firstName,lastName,email,password,passwordConfirm,passwordHint}=subForm;
    if(!firstName.trim()||!lastName.trim()||!email.trim()){setSubError(t("subErrorRequired"));return;}
    if(!/\S+@\S+\.\S+/.test(email)){setSubError(t("subErrorEmail"));return;}
    if(!validatePassword(password)){setSubError(t("subErrorPassword"));return;}
    if(password!==passwordConfirm){setSubError(t("subErrorPasswordMatch"));return;}
    if(!subForm.kvkkOk){setSubError(t("subErrorKvkk"));return;}
    const sub={firstName:firstName.trim(),lastName:lastName.trim(),email:email.trim(),gender:subForm.gender,country:subForm.country,birthYear:subForm.birthYear,phone:subForm.phone.trim(),locationOk:subForm.locationOk,password,passwordHint:passwordHint.trim()};
    mem.set("subscriber",sub); setSub(sub); setSubError("");
    setQueryCount(0); mem.set("queryCount",0);
    // Supabase'e kaydet
    const result = await sb.upsertUser({...sub, queryCount:0});
    console.log("Supabase upsert result:", result);
    setView("home");
  };

  const incrementCount=()=>{
    const n=queryCount+1; setQueryCount(n); mem.set("queryCount",n);
    // Supabase'i güncelle (arka planda)
    if(subscriber) sb.updateQueryCount(subscriber.email, n);
  };
  const tryAnalyze=()=>{ if(isFreeQuery){runAnalyze();}else{setPayMethod("");setPayQty(1);setShowPayModal(true);} };
  const handlePayAndAnalyze=()=>{ setPayPending(true); setTimeout(()=>{setPayPending(false);setShowPayModal(false);runAnalyze();},1800); };

  const runAnalyze=async()=>{
    setLoading(true);setError("");incrementCount();
    try{
      const bmi=profile.height&&profile.weight?(parseFloat(profile.weight)/Math.pow(parseFloat(profile.height)/100,2)).toFixed(1):"N/A";
      const prompt=`You are an experienced medical doctor. Based on WHO and current medical guidelines, analyze this patient and respond ONLY in valid JSON (no markdown).

Patient: ${profile.height?`Height ${profile.height}cm, Weight ${profile.weight}kg, BMI ${bmi}, `:""}${profile.gender}, ${profile.country}
Symptoms: ${selSym.join(", ")}

JSON format:
{"diagnoses":[{"name":"Disease name","probability":85,"description":"Brief description","matchingSymptoms":["symptom"],"additionalSymptoms":["symptom","symptom","symptom"],"severity":"mild|moderate|severe","urgency":"emergency|soon|routine"}],"summary":"Overall assessment","doctorAdvice":"Which specialist to see and why"}

Rules: 3-4 diseases, independent probabilities, assess emergencies realistically. Respond in the user's language based on country: ${profile.country}.`;

      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2500,messages:[{role:"user",content:prompt}]})});
      if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(`API ${res.status}: ${e?.error?.message||res.statusText}`);}
      const data=await res.json();
      if(data.error)throw new Error(data.error.message);
      let raw=data.content?.find(b=>b.type==="text")?.text||"";
      raw=raw.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/i,"").trim();
      const s=raw.indexOf("{"),e2=raw.lastIndexOf("}");
      if(s!==-1&&e2!==-1)raw=raw.slice(s,e2+1);
      const parsed=JSON.parse(raw);
      if(!parsed.diagnoses||!Array.isArray(parsed.diagnoses))throw new Error("Invalid response");
      setResult(parsed);setStep(3);
      addHistory({id:Date.now(),date:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),symptoms:[...selSym],profile:{...profile},result:parsed});
    }catch(e){setError(`Error: ${e.message||"Unknown error. Please try again."}`);} 
    setLoading(false);
  };

  const sevColor=(s)=>s==="severe"||s==="ciddi"?C.danger:s==="moderate"||s==="orta"?C.warning:C.success;
  const urgLabel=(u)=>u==="emergency"||u==="acil"?t("urgEmergency"):u==="soon"||u==="yakın"?t("urgSoon"):t("urgRoutine");
  const urgColor=(u)=>u==="emergency"||u==="acil"?C.danger:u==="soon"||u==="yakın"?C.warning:C.success;
  const sevLabel=(s)=>s==="severe"||s==="ciddi"?t("sevSevere"):s==="moderate"||s==="orta"?t("sevModerate"):t("sevMild");

  // ── Language Selector ─────────────────────────────────────
  const LangSelector=()=>(
    <div style={{display:"flex",alignItems:"center",gap:4}}>
      {LANG_OPTIONS.map(opt=>{
        const active=lang===opt.code;
        return (
          <button key={opt.code} onClick={()=>changeLang(opt.code)} style={{padding:"5px 12px",borderRadius:100,border:`1.5px solid ${active?C.accent:C.border}`,background:active?C.light:"#fff",color:active?C.primary:C.muted,fontSize:12,fontWeight:700,transition:"all .15s"}}>
            {opt.flag} {opt.label}
          </button>
        );
      })}
    </div>
  );


  // ── Kan Tahlili Component ─────────────────────────────────
  const BloodTestView = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading2, setLoading2] = useState(false);
    const [result2, setResult2] = useState(null);
    const [error2, setError2] = useState("");

    const handleFile = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      setFile(f); setResult2(null); setError2("");
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(f);
    };

    const analyze2 = async () => {
      if (!file) return;
      setLoading2(true); setError2(""); setResult2(null);
      incrementCount(); // Sorgu hakkından düş
      try {
        const reader = new FileReader();
        reader.onload = async (ev) => {
          const base64 = ev.target.result.split(",")[1];
          const mediaType = file.type || "image/jpeg";
          const isPdf = file.type === "application/pdf";
          
          const messages = isPdf ? [{
            role:"user",
            content:[
              { type:"document", source:{ type:"base64", media_type:"application/pdf", data:base64 } },
              { type:"text", text:`Sen deneyimli bir klinisyen ve laboratuvar uzmanısın. Bu kan tahlili sonucunu detaylı yorumla. Hangi değerler normal aralığın dışında? Ne anlama gelebilir? Hangi uzmana gidilmeli? Türkçe yaz. Sonunda mutlaka kesin tanı için doktora başvurulması gerektiğini belirt.` }
            ]
          }] : [{
            role:"user",
            content:[
              { type:"image", source:{ type:"base64", media_type:mediaType, data:base64 } },
              { type:"text", text:`Sen deneyimli bir klinisyen ve laboratuvar uzmanısın. Bu kan tahlili görüntüsünü detaylı yorumla. Hangi değerler normal aralığın dışında? Ne anlama gelebilir? Hangi uzmana gidilmeli? Türkçe yaz. Sonunda mutlaka kesin tanı için doktora başvurulması gerektiğini belirt.` }
            ]
          }];

          const res = await fetch("/api/chat",{
            method:"POST", headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:2000, messages })
          });
          const data = await res.json();
          if(data.error) throw new Error(data.error.message);
          const text = data.content?.find(b=>b.type==="text")?.text || "";
          setResult2(text);
          setLoading2(false);
        };
        reader.readAsDataURL(file);
      } catch(e) {
        setError2("Hata: " + (e.message||"Bilinmeyen hata"));
        setLoading2(false);
      }
    };

    return (
      <div>
        <div style={{background:"#fff0f5",border:"1.5px solid #f0c0d0",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
          <p style={{fontSize:13,color:"#800030",lineHeight:1.6}}>⚠️ Bu özellik yalnızca bilgi amaçlıdır. Kesin yorum için mutlaka doktorunuza başvurun.</p>
        </div>
        <div style={{background:C.card,borderRadius:20,padding:24,boxShadow:"0 4px 20px rgba(10,110,110,.08)",marginBottom:16}}>
          <p style={{fontSize:14,fontWeight:600,color:C.primary,marginBottom:12}}>Kan tahlili sonucunuzu yükleyin</p>
          <p style={{fontSize:13,color:C.muted,marginBottom:16}}>PDF veya fotoğraf (JPG, PNG) olarak yükleyebilirsiniz</p>
          <label style={{display:"block",background:C.light,border:"2px dashed "+C.accent,borderRadius:14,padding:"24px",textAlign:"center",cursor:"pointer",marginBottom:14}}>
            <input type="file" accept=".pdf,image/*" onChange={handleFile} style={{display:"none"}}/>
            <div style={{fontSize:36,marginBottom:8}}>📄</div>
            <p style={{fontSize:14,fontWeight:600,color:C.primary,marginBottom:4}}>Dosya Seç</p>
            <p style={{fontSize:12,color:C.muted}}>PDF veya görüntü dosyası</p>
          </label>
          {preview && file?.type?.startsWith("image") && (
            <img src={preview} alt="Tahlil" style={{width:"100%",borderRadius:12,marginBottom:14,maxHeight:300,objectFit:"contain"}}/>
          )}
          {file && !file?.type?.startsWith("image") && (
            <div style={{background:C.light,borderRadius:12,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:24}}>📋</span>
              <div>
                <p style={{fontSize:13,fontWeight:600,color:C.primary}}>{file.name}</p>
                <p style={{fontSize:11,color:C.muted}}>{(file.size/1024).toFixed(0)} KB</p>
              </div>
            </div>
          )}
          {error2 && <div style={{background:"#fff0f0",border:"1.5px solid #ffcccc",borderRadius:12,padding:"10px 14px",marginBottom:14,color:C.danger,fontSize:13}}>{error2}</div>}
          <button onClick={analyze2} disabled={!file||loading2} style={{width:"100%",padding:"13px",borderRadius:100,border:"none",background:file?C.grad:C.border,color:"#fff",fontSize:15,fontWeight:600,opacity:(!file||loading2)?0.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            {loading2?(<><div style={{width:18,height:18,border:"2px solid rgba(255,255,255,.4)",borderTop:"2px solid #fff",borderRadius:"50%"}} className="spin"/>Yorumlanıyor...</>):"🔍 Yorumla"}
          </button>
        </div>
        {result2 && (
          <div style={{background:C.card,borderRadius:20,padding:24,boxShadow:"0 4px 20px rgba(10,110,110,.08)",marginBottom:16}}>
            <p style={{fontSize:15,fontWeight:700,color:C.primary,marginBottom:12}}>🩸 Tahlil Yorumu</p>
            <p style={{fontSize:14,color:C.text,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{result2}</p>
          </div>
        )}
      </div>
    );
  };

  // ── Radyoloji Component ────────────────────────────────────
  const RadiologyView = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading2, setLoading2] = useState(false);
    const [result2, setResult2] = useState(null);
    const [error2, setError2] = useState("");
    const [imgType, setImgType] = useState("");

    const imgTypes = ["Akciğer Grafisi","Beyin MR","Karın Ultrason","Kemik Grafisi","Kalp Grafisi","Diz MR","Omurga MR","Diğer"];

    const handleFile = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      setFile(f); setResult2(null); setError2("");
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(f);
    };

    const analyze2 = async () => {
      if (!file) return;
      setLoading2(true); setError2(""); setResult2(null);
      incrementCount(); // Sorgu hakkından düş
      try {
        const reader = new FileReader();
        reader.onload = async (ev) => {
          const base64 = ev.target.result.split(",")[1];
          const mediaType = file.type || "image/jpeg";
          const res = await fetch("/api/chat",{
            method:"POST", headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:2000,
              messages:[{ role:"user", content:[
                { type:"image", source:{ type:"base64", media_type:mediaType, data:base64 } },
                { type:"text", text:`Sen deneyimli bir radyolog ve görüntüleme uzmanısın. ${imgType?`Bu ${imgType} görüntüsünü`:"Bu radyoloji görüntüsünü"} detaylı incele ve yorumla. Görüntüde dikkat çeken bulgular neler? Normal mi, anormal mi? Ne anlama gelebilir? Hangi uzmana gidilmeli? Türkçe yaz. Sonunda mutlaka kesin tanı için uzman hekime başvurulması gerektiğini belirt.` }
              ]}]
            })
          });
          const data = await res.json();
          if(data.error) throw new Error(data.error.message);
          const text = data.content?.find(b=>b.type==="text")?.text || "";
          setResult2(text);
          setLoading2(false);
        };
        reader.readAsDataURL(file);
      } catch(e) {
        setError2("Hata: " + (e.message||"Bilinmeyen hata"));
        setLoading2(false);
      }
    };

    return (
      <div>
        <div style={{background:"#f0f5ff",border:"1.5px solid #c0d0f0",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
          <p style={{fontSize:13,color:"#003080",lineHeight:1.6}}>⚠️ Bu özellik yalnızca bilgi amaçlıdır. Radyoloji görüntüleri mutlaka uzman radyolog tarafından değerlendirilmelidir.</p>
        </div>
        <div style={{background:C.card,borderRadius:20,padding:24,boxShadow:"0 4px 20px rgba(10,110,110,.08)",marginBottom:16}}>
          <p style={{fontSize:14,fontWeight:600,color:C.primary,marginBottom:8}}>Görüntü türünü seçin</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
            {imgTypes.map(t2=>(
              <button key={t2} onClick={()=>setImgType(t2)} style={{padding:"6px 12px",borderRadius:100,fontSize:12,fontWeight:500,border:"1.5px solid "+(imgType===t2?C.accent:C.border),background:imgType===t2?C.light:"#fff",color:imgType===t2?C.primary:C.muted}}>
                {t2}
              </button>
            ))}
          </div>
          <p style={{fontSize:14,fontWeight:600,color:C.primary,marginBottom:12}}>Görüntüyü yükleyin</p>
          <p style={{fontSize:13,color:C.muted,marginBottom:16}}>JPG, PNG veya DICOM görüntüsü yükleyebilirsiniz</p>
          <label style={{display:"block",background:C.light,border:"2px dashed "+C.accent,borderRadius:14,padding:"24px",textAlign:"center",cursor:"pointer",marginBottom:14}}>
            <input type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
            <div style={{fontSize:36,marginBottom:8}}>🔬</div>
            <p style={{fontSize:14,fontWeight:600,color:C.primary,marginBottom:4}}>Görüntü Seç</p>
            <p style={{fontSize:12,color:C.muted}}>Röntgen, MR, ultrason, tomografi</p>
          </label>
          {preview && <img src={preview} alt="Radyoloji" style={{width:"100%",borderRadius:12,marginBottom:14,maxHeight:350,objectFit:"contain",background:"#000"}}/>}
          {error2 && <div style={{background:"#fff0f0",border:"1.5px solid #ffcccc",borderRadius:12,padding:"10px 14px",marginBottom:14,color:C.danger,fontSize:13}}>{error2}</div>}
          <button onClick={analyze2} disabled={!file||loading2} style={{width:"100%",padding:"13px",borderRadius:100,border:"none",background:file?"linear-gradient(135deg,#1a3a8a,#3a6ad4)":C.border,color:"#fff",fontSize:15,fontWeight:600,opacity:(!file||loading2)?0.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            {loading2?(<><div style={{width:18,height:18,border:"2px solid rgba(255,255,255,.4)",borderTop:"2px solid #fff",borderRadius:"50%"}} className="spin"/>Yorumlanıyor...</>):"🔍 Görüntüyü Yorumla"}
          </button>
        </div>
        {result2 && (
          <div style={{background:C.card,borderRadius:20,padding:24,boxShadow:"0 4px 20px rgba(10,110,110,.08)",marginBottom:16}}>
            <p style={{fontSize:15,fontWeight:700,color:"#1a3a8a",marginBottom:12}}>🔬 Radyoloji Yorumu</p>
            <p style={{fontSize:14,color:C.text,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{result2}</p>
          </div>
        )}
      </div>
    );
  };


  // ── Admin Panel Component ──────────────────────────────────
  const AdminPanel = () => {
    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading2, setLoading2] = useState(true);
    const [msg, setMsg] = useState("");

    const loadData = async () => {
      setLoading2(true);
      try {
        // Bekleyen ödemeler
        const pRes = await fetch(SUPABASE_URL + "/rest/v1/pending_payments?order=created_at.desc&limit=50", {
          headers: sb.headers
        });
        const pData = await pRes.json();
        setPayments(Array.isArray(pData) ? pData : []);

        // Kullanıcılar
        const uRes = await fetch(SUPABASE_URL + "/rest/v1/users?order=created_at.desc&limit=50", {
          headers: sb.headers
        });
        const uData = await uRes.json();
        setUsers(Array.isArray(uData) ? uData : []);
      } catch(e) { console.error(e); }
      setLoading2(false);
    };

    useEffect(() => { loadData(); }, []);

    const approvePayment = async (payment) => {
      try {
        // Ödemeyi onayla
        await fetch(SUPABASE_URL + "/rest/v1/pending_payments?id=eq." + payment.id, {
          method: "PATCH",
          headers: { ...sb.headers, "Prefer": "return=minimal" },
          body: JSON.stringify({ status: "confirmed", confirmed_at: new Date().toISOString() })
        });

        // Ödeme methodundan qty çıkar (bank-qty3 → 3)
        const qtyMatch = payment.method && payment.method.match(/qty(\d+)/);
        const qty = qtyMatch ? parseInt(qtyMatch[1]) : 1;
        const user = users.find(u => u.email === payment.email);
        if (user) {
          const newCount = Math.max(0, (user.query_count || 0) - qty);
          await fetch(SUPABASE_URL + "/rest/v1/users?email=eq." + encodeURIComponent(payment.email), {
            method: "PATCH",
            headers: { ...sb.headers, "Prefer": "return=minimal" },
            body: JSON.stringify({ query_count: newCount })
          });
        }

        setMsg("✅ " + payment.email + " onaylandı, 1 sorgu hakkı verildi!");
        loadData();
      } catch(e) {
        setMsg("❌ Hata: " + e.message);
      }
    };

    const rejectPayment = async (id) => {
      await fetch(SUPABASE_URL + "/rest/v1/pending_payments?id=eq." + id, {
        method: "PATCH",
        headers: { ...sb.headers, "Prefer": "return=minimal" },
        body: JSON.stringify({ status: "rejected" })
      });
      setMsg("❌ Ödeme reddedildi.");
      loadData();
    };

    const pendingPayments = payments.filter(p => p.status === "pending");
    const confirmedPayments = payments.filter(p => p.status === "confirmed");

    return (
      <div>
        {msg && (
          <div style={{background:msg.startsWith("✅")?"#f0fff4":"#fff0f0",border:"1.5px solid "+(msg.startsWith("✅")?"#80d8a0":"#ffcccc"),borderRadius:12,padding:"12px 16px",marginBottom:16,fontSize:14,fontWeight:600}}>
            {msg}
          </div>
        )}

        {/* İstatistikler */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {[
            {label:"Toplam Üye",value:users.length,color:C.primary},
            {label:"Bekleyen Ödeme",value:pendingPayments.length,color:"#f0a500"},
            {label:"Onaylanan",value:confirmedPayments.length,color:"#00a060"},
          ].map(({label,value,color})=>(
            <div key={label} style={{background:C.card,borderRadius:16,padding:"16px 12px",textAlign:"center",boxShadow:"0 4px 16px rgba(10,110,110,.08)"}}>
              <p style={{fontSize:28,fontWeight:800,color}}>{value}</p>
              <p style={{fontSize:11,color:C.muted,marginTop:4}}>{label}</p>
            </div>
          ))}
        </div>

        {/* Bekleyen Ödemeler */}
        <div style={{background:C.card,borderRadius:20,padding:20,marginBottom:16,boxShadow:"0 4px 16px rgba(10,110,110,.08)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <p style={{fontSize:15,fontWeight:700,color:C.primary}}>⏳ Bekleyen Ödemeler ({pendingPayments.length})</p>
            <button onClick={loadData} style={{background:C.light,border:"none",borderRadius:100,padding:"6px 12px",fontSize:12,color:C.primary,fontWeight:600}}>🔄 Yenile</button>
          </div>
          {loading2 ? (
            <p style={{color:C.muted,textAlign:"center",padding:20}}>Yükleniyor...</p>
          ) : pendingPayments.length === 0 ? (
            <p style={{color:C.muted,textAlign:"center",padding:20}}>Bekleyen ödeme yok</p>
          ) : pendingPayments.map(p=>(
            <div key={p.id} style={{border:"1.5px solid #f0e0a0",borderRadius:14,padding:"14px 16px",marginBottom:10,background:"#fffdf0"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <div>
                  <p style={{fontSize:13,fontWeight:700,color:C.text}}>{p.email}</p>
                  <p style={{fontSize:12,color:C.muted}}>Ref: <strong>{p.ref_code}</strong> · {p.amount} · {p.method}</p>
                  <p style={{fontSize:11,color:C.muted}}>{new Date(p.created_at).toLocaleString("tr-TR")}</p>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>approvePayment(p)} style={{flex:1,padding:"10px",borderRadius:100,border:"none",background:"linear-gradient(135deg,#00a060,#00d080)",color:"#fff",fontSize:13,fontWeight:700}}>
                  ✅ Onayla
                </button>
                <button onClick={()=>rejectPayment(p.id)} style={{flex:1,padding:"10px",borderRadius:100,border:"1.5px solid #ffcccc",background:"#fff",color:"#cc0000",fontSize:13,fontWeight:700}}>
                  ❌ Reddet
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Son Kullanıcılar */}
        <div style={{background:C.card,borderRadius:20,padding:20,marginBottom:16,boxShadow:"0 4px 16px rgba(10,110,110,.08)"}}>
          <p style={{fontSize:15,fontWeight:700,color:C.primary,marginBottom:14}}>👥 Son Üyeler</p>
          {loading2 ? (
            <p style={{color:C.muted,textAlign:"center",padding:20}}>Yükleniyor...</p>
          ) : users.slice(0,10).map(u=>(
            <div key={u.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid "+C.border}}>
              <div>
                <p style={{fontSize:13,fontWeight:600,color:C.text}}>{u.first_name} {u.last_name}</p>
                <p style={{fontSize:11,color:C.muted}}>{u.email}</p>
              </div>
              <div style={{textAlign:"right"}}>
                <p style={{fontSize:12,fontWeight:700,color:C.primary}}>{u.query_count} sorgu</p>
                <p style={{fontSize:10,color:C.muted}}>{new Date(u.created_at).toLocaleDateString("tr-TR")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Nav ───────────────────────────────────────────────────
  const Nav=()=>(
    <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(255,255,255,.93)",backdropFilter:"blur(12px)",borderBottom:"1px solid #d0e8e8",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>{setView("home");resetApp();}}>
        <span style={{fontSize:20}}>🩺</span>
        <span style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.primary,fontWeight:700}}>{t("appName")}</span>
      </div>
      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        <LangSelector/>
        <div style={{fontSize:11,fontWeight:700,color:freeRemaining>0?C.success:C.warning,background:freeRemaining>0?"#e8faf2":"#fff8e6",border:`1.5px solid ${freeRemaining>0?"#b0e8cc":"#f0d090"}`,borderRadius:100,padding:"4px 10px",whiteSpace:"nowrap"}}>
          {adminUser?"♾️ Sınırsız":freeRemaining>0?t("freeQueriesLeft",freeRemaining):t("nextQueryCost",currency.label)}
        </div>
        {subscriber&&(
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setView("history")} style={{background:"transparent",border:"1.5px solid #d0e8e8",borderRadius:100,padding:"6px 12px",fontSize:12,fontWeight:600,color:C.primary}}>{t("navHistory")} {history.length>0?`(${history.length})`:""}</button>
              <button onClick={()=>setView("graph")} style={{background:"transparent",border:"1.5px solid #d0e8e8",borderRadius:100,padding:"6px 12px",fontSize:12,fontWeight:600,color:C.primary}}>📊</button>
              <button onClick={()=>setView("blood")} style={{background:"transparent",border:"1.5px solid #d0e8e8",borderRadius:100,padding:"6px 12px",fontSize:12,fontWeight:600,color:C.primary}}>🩸</button>
              <button onClick={()=>setView("radio")} style={{background:"transparent",border:"1.5px solid #d0e8e8",borderRadius:100,padding:"6px 12px",fontSize:12,fontWeight:600,color:C.primary}}>🔬</button>
            </div>
          )}
        {subscriber?(
          <>
          <button onClick={()=>{setView("home");resetApp();}} style={{background:C.grad,border:"none",borderRadius:100,padding:"6px 12px",fontSize:12,fontWeight:600,color:"#fff"}}>{adminUser?"👑":"👤"} {subscriber.firstName}</button>
          {adminUser&&<button onClick={()=>setView("admin")} style={{background:"linear-gradient(135deg,#7b2ff7,#f107a3)",border:"none",borderRadius:100,padding:"6px 12px",fontSize:12,fontWeight:600,color:"#fff"}}>⚙️ Admin</button>}
          <button onClick={()=>{mem.set("rememberedUser",null);setSub(null);setView("home");resetApp();}} style={{background:"#fff",border:"1.5px solid "+C.border,borderRadius:100,padding:"6px 12px",fontSize:12,fontWeight:600,color:C.muted}}>{t("navLogout")}</button>
          </>
        ):(
          <>
          <button onClick={()=>setView("login")} style={{background:"#fff",border:"1.5px solid "+C.accent,borderRadius:100,padding:"6px 12px",fontSize:12,fontWeight:600,color:C.primary}}>{t("btnLogin")}</button>
          <button onClick={()=>setView("subscribe")} style={{background:C.grad,border:"none",borderRadius:100,padding:"6px 12px",fontSize:12,fontWeight:600,color:"#fff"}}>{t("btnSubscribe")}</button>
          </>
        )}
      </div>
    </div>
  );

  // ── Emergency Card ────────────────────────────────────────
  const EmergencyCard=()=>{
    const diagNames=result?.diagnoses?.slice(0,2).map(d=>d.name).join(", ")||"-";
    const symList=selSym.slice(0,6).join(", ")||"-";
    const name=subscriber?subscriber.firstName+" "+subscriber.lastName:"-";
    const phone=subscriber?.phone||"-";
    const loc=location;
    const mapsUrl=loc?"https://maps.google.com/?q="+loc.lat+","+loc.lng:null;
    const userCountry=profile.country||subscriber?.country||"Diğer";
    const emg=getEmergency(userCountry);
    const smsText="EMERGENCY!%0AName: "+encodeURIComponent(name)+"%0APhone: "+encodeURIComponent(phone)+"%0ALocation: "+encodeURIComponent(loc?.address||"-")+(mapsUrl?"%0AMap: "+encodeURIComponent(mapsUrl):"")+"%0ASymptoms: "+encodeURIComponent(symList)+"%0ADiagnosis: "+encodeURIComponent(diagNames);
    const waText="EMERGENCY HELP NEEDED!%0A%0AName: "+encodeURIComponent(name)+"%0APhone: "+encodeURIComponent(phone)+"%0ALocation: "+encodeURIComponent(loc?.address||"-")+(mapsUrl?"%0AMap: "+encodeURIComponent(mapsUrl):"")+"%0A%0ASymptoms: "+encodeURIComponent(symList)+"%0APossible diagnosis: "+encodeURIComponent(diagNames);
    return (
      <div style={{position:"fixed",inset:0,zIndex:600,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
        <div className="modal" style={{background:"#fff",borderRadius:24,padding:28,maxWidth:440,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,.35)"}}>
          <div style={{textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:42,marginBottom:4}}>🚨</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#cc2222",marginBottom:4}}>{t("emergencyCardTitle")}</h3>
            <p style={{fontSize:12,color:C.muted}}>{t("emergencyCardSub")}</p>
          </div>
          <div style={{background:"#fff5f5",border:"2px solid #ffaaaa",borderRadius:14,padding:"14px 16px",marginBottom:14,fontSize:13,lineHeight:2}}>
            <div><strong>{t("labelName")}</strong> {name}</div>
            <div><strong>{t("labelPhone")}</strong> {phone}</div>
            <div style={{wordBreak:"break-word"}}>
              <strong>{t("labelLocation")}</strong>{" "}
              {locLoading?<span style={{color:C.muted}}>{t("gettingLocation")} <span className="spin" style={{display:"inline-block",width:12,height:12,border:"2px solid #ccc",borderTop:"2px solid #e05c5c",borderRadius:"50%",verticalAlign:"middle"}}/></span>
               :loc?<>{loc.address.length>80?loc.address.slice(0,80)+"…":loc.address}{mapsUrl&&<><br/><a href={mapsUrl} target="_blank" rel="noreferrer" style={{color:C.primary,fontWeight:600,fontSize:12}}>{t("btnMaps")}</a></>}</>
               :<span style={{color:C.danger}}>{t("locationFailed")}</span>}
            </div>
            <div><strong>{t("labelSymptoms")}</strong> {symList}</div>
            <div><strong>{t("labelDiagnosis")}</strong> {diagNames}</div>
          </div>
          <a href={"tel:"+emg.ambulance} style={{display:"block",background:"#cc2222",color:"#fff",borderRadius:100,padding:"14px",fontSize:16,fontWeight:800,textDecoration:"none",textAlign:"center",marginBottom:10,boxShadow:"0 6px 20px rgba(204,34,34,.4)"}}>
            {t("btnCallAmbulance",emg.label)}
          </a>
          {emg.police!==emg.ambulance&&(
            <a href={"tel:"+emg.police} style={{display:"block",background:"#1a3a8a",color:"#fff",borderRadius:100,padding:"12px",fontSize:14,fontWeight:700,textDecoration:"none",textAlign:"center",marginBottom:10,boxShadow:"0 4px 14px rgba(26,58,138,.35)"}}>
              {t("btnCallPolice",emg.police)}
            </a>
          )}
          {loc&&<a href={"sms:"+emg.ambulance+"?body="+smsText} style={{display:"block",background:"#e06020",color:"#fff",borderRadius:100,padding:"12px",fontSize:14,fontWeight:700,textDecoration:"none",textAlign:"center",marginBottom:10,boxShadow:"0 4px 14px rgba(224,96,32,.35)"}}>{t("btnSendSMS",emg.ambulance)}</a>}
          <a href={"https://wa.me/?text="+waText} target="_blank" rel="noreferrer" style={{display:"block",background:"#25d366",color:"#fff",borderRadius:100,padding:"12px",fontSize:14,fontWeight:700,textDecoration:"none",textAlign:"center",marginBottom:10,boxShadow:"0 4px 14px rgba(37,211,102,.35)"}}>{t("btnWhatsApp")}</a>
          {mapsUrl&&<a href={mapsUrl} target="_blank" rel="noreferrer" style={{display:"block",background:C.primary,color:"#fff",borderRadius:100,padding:"12px",fontSize:14,fontWeight:700,textDecoration:"none",textAlign:"center",marginBottom:14,boxShadow:"0 4px 14px rgba(10,110,110,.35)"}}>{t("btnMaps")}</a>}
          <button onClick={()=>setShowEmergencyCard(false)} style={{width:"100%",padding:"11px",borderRadius:100,border:"1.5px solid #ddd",background:"#fff",color:C.muted,fontSize:13,fontWeight:500}}>{t("btnClose")}</button>
        </div>
      </div>
    );
  };

  // ── Share Location ────────────────────────────────────────
  const ShareLocation=()=>{
    const [shared,setShared]=useState(false);
    const [loading2,setLoading2]=useState(false);
    const doShare=async()=>{
      setLoading2(true);
      const loc=location||await getLocation();
      setLoading2(false);
      if(!loc){alert(t("locationNotAvail"));return;}
      const mapsUrl="https://maps.google.com/?q="+loc.lat+","+loc.lng;
      const txt=loc.address+"\n"+mapsUrl;
      if(navigator.share){try{await navigator.share({title:t("appName"),text:txt,url:mapsUrl});setShared(true);return;}catch(e){}}
      try{await navigator.clipboard.writeText(txt);setShared(true);alert(t("locationCopied"));}catch(e){window.open(mapsUrl,"_blank");setShared(true);}
    };
    return (
      <button onClick={doShare} disabled={loading2} style={{flex:1,padding:"12px 10px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.primary,fontSize:13,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
        {loading2?<span className="spin" style={{width:16,height:16,border:"2px solid #ccc",borderTop:"2px solid "+C.accent,borderRadius:"50%",display:"inline-block"}}/>:"📍"}
        {loading2?t("btnGettingLoc"):shared?t("btnLocShared"):t("btnShareLoc")}
      </button>
    );
  };

  // ── Pay Modal ─────────────────────────────────────────────

  // Sorgu paketleri
  const PACKAGES = [
    {qty:1,  label:"1 Sorgu",   price:4.99,  priceLabel:"4,99 ₺",  badge:""},
    {qty:3,  label:"3 Sorgu",   price:12.99, priceLabel:"12,99 ₺", badge:"🔥 Popüler"},
    {qty:5,  label:"5 Sorgu",   price:19.99, priceLabel:"19,99 ₺", badge:"💰 Tasarruf"},
    {qty:10, label:"10 Sorgu",  price:34.99, priceLabel:"34,99 ₺", badge:"⭐ En İyi Fiyat"},
  ];

  const PayModal=()=>{
    const [cardName,setCardName]=useState("");
    const [cardNo,setCardNo]=useState("");
    const [cardExp,setCardExp]=useState("");
    const [cardCvv,setCardCvv]=useState("");

    const formatCardNo=(v)=>v.replace(/\D/g,"").slice(0,16).replace(/(\d{4})/g,"$1 ").trim();
    const formatExp=(v)=>{ const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };
    const cardOk=cardName.trim()&&cardNo.replace(/\s/g,"").length===16&&cardExp.length===5&&cardCvv.length>=3;

    return (
    <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
      <div className="modal" style={{background:"#fff",borderRadius:24,padding:28,maxWidth:420,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,.3)"}}>
        
        {/* Header */}
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:44,marginBottom:6}}>💳</div>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:21,color:C.primary,marginBottom:4}}>{t("payTitle")}</h3>
          <p style={{color:C.muted,fontSize:13}}>Kaç sorgu hakkı almak istiyorsunuz?</p>
        </div>

        {/* Paket Seçimi */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
          {PACKAGES.map(pkg=>(
            <button key={pkg.qty} onClick={()=>setPayQty(pkg.qty)}
              style={{padding:"12px 8px",borderRadius:14,border:"2px solid "+(payQty===pkg.qty?C.accent:C.border),
                background:payQty===pkg.qty?C.light:"#fff",textAlign:"center",cursor:"pointer",position:"relative"}}>
              {pkg.badge&&<span style={{position:"absolute",top:-8,left:"50%",transform:"translateX(-50%)",background:C.grad,color:"#fff",fontSize:9,fontWeight:700,borderRadius:100,padding:"2px 8px",whiteSpace:"nowrap"}}>{pkg.badge}</span>}
              <p style={{fontSize:15,fontWeight:800,color:payQty===pkg.qty?C.primary:C.text,marginBottom:2}}>{pkg.priceLabel}</p>
              <p style={{fontSize:12,color:C.muted}}>{pkg.label}</p>
              {pkg.qty>1&&<p style={{fontSize:10,color:C.accent,fontWeight:600}}>{(pkg.price/pkg.qty).toFixed(2)}₺/sorgu</p>}
            </button>
          ))}
        </div>
        <div style={{background:C.light,borderRadius:12,padding:"10px 16px",marginBottom:16,textAlign:"center"}}>
          <span style={{fontSize:11,color:C.muted}}>Seçilen: </span>
          <span style={{fontSize:18,fontWeight:800,color:C.primary}}>{PACKAGES.find(p=>p.qty===payQty)?.priceLabel}</span>
          <span style={{fontSize:11,color:C.muted,marginLeft:6}}>({payQty} sorgu hakkı)</span>
        </div>

        {payPending?(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:"24px 0"}}>
            <div style={{width:40,height:40,border:"3px solid #d0e8e8",borderTop:"3px solid "+C.accent,borderRadius:"50%"}} className="spin"/>
            <p style={{color:C.muted,fontSize:14}}>{t("processing")}</p>
          </div>
        ):payMethod===""?(
          /* Yöntem Seçim Ekranı */
          <>
            <p style={{fontSize:13,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:14,textAlign:"center"}}>{t("paySelectMethod")}</p>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
              {[
                {id:"bank",      icon:"🏦", label:t("payMethodBank"),    sub:t("payMethodBankSub"),    bg:"#f5f0ff", border:"#b0a0e0", color:"#400080", active:true},
                {id:"googleplay",icon:"🎮", label:t("payMethodGoogle"), sub:t("payMethodGoogleSub"), bg:"#f0fff4", border:"#80d8a0", color:"#006030", active:true},
                {id:"card",      icon:"💳", label:t("payMethodCard"),   sub:lang==="tr"?"Yakında":"Coming soon",  bg:"#f8f8f8", border:"#d0d0d0", color:"#888", active:false},
                {id:"carrier",   icon:"📱", label:t("payMethodCarrier"),sub:lang==="tr"?"Yakında":"Coming soon",  bg:"#f8f8f8", border:"#d0d0d0", color:"#888", active:false},
              ].map(({id,icon,label,sub,bg,border,color,active})=>(
                <button key={id} onClick={()=>active&&setPayMethod(id)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:16,border:"1.5px solid "+border,background:bg,cursor:active?"pointer":"default",textAlign:"left",opacity:active?1:0.55}}>
                  <span style={{fontSize:28,flexShrink:0}}>{icon}</span>
                  <div style={{flex:1}}>
                    <p style={{fontSize:14,fontWeight:700,color,marginBottom:2}}>{label}</p>
                    <p style={{fontSize:12,color:active?C.muted:"#aaa"}}>{sub}</p>
                  </div>
                  {active
                    ? <span style={{marginLeft:"auto",fontSize:16,color:C.muted}}>›</span>
                    : <span style={{marginLeft:"auto",fontSize:10,fontWeight:700,color:"#aaa",background:"#e8e8e8",borderRadius:100,padding:"2px 8px"}}>{lang==="tr"?"YAKINDA":"SOON"}</span>
                  }
                </button>
              ))}
            </div>
            {!subscriber&&(
              <button onClick={()=>{setShowPayModal(false);setView("subscribe");}} style={{width:"100%",padding:"12px",borderRadius:100,border:"1.5px solid "+C.accent,background:"#fff",color:C.primary,fontSize:14,fontWeight:600,marginBottom:10}}>
                {t("btnUpgrade")}
              </button>
            )}
            <button onClick={()=>{setShowPayModal(false);setPayMethod("");}} style={{width:"100%",padding:"11px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:13,fontWeight:500}}>{t("btnCancel")}</button>
          </>
        ):payMethod==="card"?(
          /* Kredi Kartı Formu */
          <>
            <button onClick={()=>setPayMethod("")} style={{background:"none",border:"none",color:C.muted,fontSize:13,marginBottom:16,cursor:"pointer",padding:0}}>← {t("paySelectMethod")}</button>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
              <div>
                <label style={{fontSize:12,fontWeight:600,color:C.text,display:"block",marginBottom:4}}>{t("payCardName")}</label>
                <input placeholder={t("payCardPlaceholderName")} value={cardName} onChange={e=>setCardName(e.target.value)} style={{fontSize:15}}/>
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:600,color:C.text,display:"block",marginBottom:4}}>{t("payCardNumber")}</label>
                <input placeholder={t("payCardPlaceholderNumber")} value={cardNo}
                  onChange={e=>setCardNo(formatCardNo(e.target.value))}
                  inputMode="numeric" style={{fontSize:15,letterSpacing:2}}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:C.text,display:"block",marginBottom:4}}>{t("payCardExpiry")}</label>
                  <input placeholder="AA/YY" value={cardExp} onChange={e=>setCardExp(formatExp(e.target.value))} inputMode="numeric" style={{fontSize:15}}/>
                </div>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:C.text,display:"block",marginBottom:4}}>{t("payCardCvv")}</label>
                  <input placeholder="000" value={cardCvv} onChange={e=>setCardCvv(e.target.value.replace(/\D/g,"").slice(0,4))} inputMode="numeric" type="password" style={{fontSize:15}}/>
                </div>
              </div>
            </div>
            <div style={{background:"#f0f9f0",border:"1px solid #a0d8a0",borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:16}}>🔒</span>
              <p style={{fontSize:12,color:"#006030"}}>256-bit SSL ile şifrelenmiş güvenli ödeme</p>
            </div>
            <button onClick={handlePayAndAnalyze} disabled={!cardOk} style={{width:"100%",padding:"14px",borderRadius:100,border:"none",background:cardOk?C.grad:C.border,color:"#fff",fontSize:15,fontWeight:700,marginBottom:10,opacity:cardOk?1:0.6}}>
              {t("payConfirm")}
            </button>
            <button onClick={()=>setPayMethod("")} style={{width:"100%",padding:"11px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:13,fontWeight:500}}>{t("btnCancel")}</button>
          </>
        ):payMethod==="googleplay"?(
          /* Google Play */
          <>
            <button onClick={()=>setPayMethod("")} style={{background:"none",border:"none",color:C.muted,fontSize:13,marginBottom:16,cursor:"pointer",padding:0}}>← {t("paySelectMethod")}</button>
            <div style={{background:"#f0fff4",border:"1.5px solid #80d8a0",borderRadius:16,padding:20,marginBottom:14}}>
              <div style={{fontSize:36,textAlign:"center",marginBottom:10}}>🎮</div>
              <p style={{fontSize:13,color:"#006030",lineHeight:1.7,marginBottom:12,textAlign:"center"}}>
                {lang==="tr"
                  ?"Google Play'de uygulamamızı bulun, uygulama içi satın alma ile sorgu hakkı satın alın. Ödeme Google hesabınıza bağlı yönteme yansır."
                  :"Find our app on Google Play and purchase a query credit via in-app purchase."}
              </p>
              <div style={{background:"#fff",border:"1px solid #a0d8a0",borderRadius:12,padding:"12px 16px",fontSize:13,lineHeight:2}}>
                <div>📱 <strong>{lang==="tr"?"Uygulama:":"App:"}</strong> Neyim Var?</div>
                <div>💰 <strong>{lang==="tr"?"Tutar:":"Amount:"}</strong> {currency.label} / {lang==="tr"?"sorgu":"query"}</div>
                <div>✅ <strong>{lang==="tr"?"Ödeme:":"Payment:"}</strong> {lang==="tr"?"Google Play bakiyesi veya kayıtlı kart":"Google Play balance or saved card"}</div>
              </div>
            </div>
            <button onClick={handlePayAndAnalyze} style={{width:"100%",padding:"14px",borderRadius:100,border:"none",background:"linear-gradient(135deg,#34a853,#0f9d58)",color:"#fff",fontSize:15,fontWeight:700,marginBottom:10,boxShadow:"0 6px 18px rgba(52,168,83,.4)"}}>
              {t("payGoogleBtn")}
            </button>
            <button onClick={()=>setPayMethod("")} style={{width:"100%",padding:"11px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:13,fontWeight:500}}>{t("btnCancel")}</button>
          </>
        ):(
          /* Telefon Faturası */
          payMethod==="carrier" ? (
          <>
            <button onClick={()=>setPayMethod("")} style={{background:"none",border:"none",color:C.muted,fontSize:13,marginBottom:16,cursor:"pointer",padding:0}}>← {t("paySelectMethod")}</button>
            <div style={{background:"#fff8f0",border:"1.5px solid #f0c080",borderRadius:16,padding:20,marginBottom:14,textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:10}}>📱</div>
              <p style={{fontSize:14,color:"#804000",lineHeight:1.7,marginBottom:12}}>{t("payCarrierInfo")}</p>
              <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
                {["🟡 Turkcell","🔵 Türk Telekom","🔴 Vodafone"].map(op=>(
                  <span key={op} style={{background:"#fff",border:"1px solid #f0c080",borderRadius:100,padding:"4px 12px",fontSize:12,fontWeight:600,color:"#804000"}}>{op}</span>
                ))}
              </div>
            </div>
            <button onClick={handlePayAndAnalyze} style={{width:"100%",padding:"14px",borderRadius:100,border:"none",background:"linear-gradient(135deg,#f0a500,#f5c842)",color:"#fff",fontSize:15,fontWeight:700,marginBottom:10,boxShadow:"0 6px 18px rgba(240,165,0,.4)"}}>
              {t("payCarrierBtn")}
            </button>
            <button onClick={()=>setPayMethod("")} style={{width:"100%",padding:"11px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:13,fontWeight:500}}>{t("btnCancel")}</button>
          </>
          ):(
          /* Havale / EFT */
          <>
            <button onClick={()=>setPayMethod("")} style={{background:"none",border:"none",color:C.muted,fontSize:13,marginBottom:16,cursor:"pointer",padding:0}}>← {t("paySelectMethod")}</button>
            <div style={{background:"#f5f0ff",border:"1.5px solid #b0a0e0",borderRadius:16,padding:20,marginBottom:14}}>
              <div style={{fontSize:36,textAlign:"center",marginBottom:10}}>🏦</div>
              {/* Hesap bilgileri */}
              <div style={{background:"#fff",border:"1px solid #c0b0f0",borderRadius:12,padding:"14px 16px",marginBottom:12,fontSize:13,lineHeight:2}}>
                <div>🏦 <strong>{lang==="tr"?"Banka:":"Bank:"}</strong> Yapı Kredi Bankası (YKB)</div>
                <div>👤 <strong>{lang==="tr"?"Hesap Adı:":"Account:"}</strong> Nuh Kozan</div>
                <div>💰 <strong>{lang==="tr"?"Tutar:":"Amount:"}</strong> <span style={{color:"#400080",fontWeight:700}}>{currency.label}</span></div>
                <div>📝 <strong>{lang==="tr"?"Açıklama:":"Note:"}</strong> {lang==="tr"?"Referans kodunuzu yazın":"Add your reference code"}</div>
              </div>
              {/* Referans kodu */}
              <p style={{fontSize:12,fontWeight:700,color:"#400080",marginBottom:6}}>{t("payBankRef")}</p>
              {/* Action buttons — IBAN hidden */}
              <div style={{display:"flex",gap:10,marginBottom:14}}>
                <button onClick={()=>{
                  try{ navigator.clipboard.writeText("TR150006701000000015745935"); alert(lang==="tr"?"IBAN kopyalandı! ✓":"IBAN copied! ✓"); }
                  catch(e){ alert("TR150006701000000015745935"); }
                }} style={{flex:1,padding:"12px 8px",borderRadius:12,border:"1.5px solid #b0a0e0",background:"#fff",color:"#400080",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  📋 {lang==="tr"?"IBAN Kopyala":"Copy IBAN"}
                </button>
                <a href="ykb://transfer?iban=TR150006701000000015745935&amount=4.99&description=NeyimVar" style={{flex:1,padding:"12px 8px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#1a237e,#3949ab)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,textDecoration:"none"}}
                  onClick={(e)=>{
                    setTimeout(()=>{
                      window.location.href="https://www.ykb.com/tr-TR/Bireysel/HizmetlerimizKanallar/InternetSubesi/Sayfalar/InternetSubesi.aspx";
                    },500);
                  }}>
                  💸 {lang==="tr"?"YKB ile Havale Yap":"Transfer via YKB"}
                </a>
              </div>
              {(()=>{
                const ref=(subscriber?subscriber.firstName.toUpperCase().slice(0,3):"NK")+"-"+Date.now().toString().slice(-6);
                return (
                  <div>
                    <div style={{background:"#400080",borderRadius:10,padding:"12px 16px",textAlign:"center",letterSpacing:4,fontSize:18,fontWeight:800,color:"#fff",marginBottom:6,userSelect:"all",fontFamily:"monospace"}}>
                      {ref}
                    </div>
                    <p style={{fontSize:11,color:"#604090",textAlign:"center",marginBottom:12}}>
                      {lang==="tr"?"(Kopyalamak için basılı tutun)":"(Hold to copy)"}
                    </p>
                  </div>
                );
              })()}
              <p style={{fontSize:12,color:"#604090",lineHeight:1.6,textAlign:"center"}}>{t("payBankInfo")}</p>
            </div>
            <button onClick={async()=>{
                try {
                  const ref=(subscriber?subscriber.firstName.toUpperCase().slice(0,3):"NK")+"-"+Date.now().toString().slice(-6);
                  await sb.savePendingPayment(subscriber?.email||"guest", ref, PACKAGES.find(p=>p.qty===payQty)?.priceLabel||currency.label, "bank-qty"+payQty);
                } catch(e){}
                // Analiz başlatma — admin onayı bekle
                setShowPayModal(false);
                setPayMethod("");
                alert("✅ Talebiniz alındı!\n\nHavaleyi yaptıktan sonra genellikle 15 dakika içinde sorgu hakkınız tanımlanır.\n\nReferans kodunuzu transfer açıklamasına yazmayı unutmayın.");
              }} style={{width:"100%",padding:"14px",borderRadius:100,border:"none",background:"linear-gradient(135deg,#5000c0,#8040e0)",color:"#fff",fontSize:15,fontWeight:700,marginBottom:10,boxShadow:"0 6px 18px rgba(80,0,192,.35)"}}>
              {t("payBankBtn")}
            </button>
            <button onClick={()=>setPayMethod("")} style={{width:"100%",padding:"11px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:13,fontWeight:500}}>{t("btnCancel")}</button>
          </>
          )
        )}
      </div>
    </div>
    );
  };

  // ── Bottom ────────────────────────────────────────────────
  const Bottom=()=>{
    const [donAmt,setDonAmt]=useState("");
    return (
      <div style={{maxWidth:600,margin:"0 auto",padding:"8px 0 60px"}}>
        {/* Hızlı Analiz Kartları */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          <button onClick={()=>setView("blood")} style={{background:"linear-gradient(135deg,#fff0f5,#ffe0ea)",border:"1.5px solid #f0a0b8",borderRadius:18,padding:"20px 16px",textAlign:"center",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
            <span style={{fontSize:32}}>🩸</span>
            <p style={{fontSize:13,fontWeight:700,color:"#a0003a",lineHeight:1.3}}>Kan Tahlili Yorumlat</p>
            <p style={{fontSize:11,color:"#c06080"}}>PDF veya fotoğraf yükle</p>
          </button>
          <button onClick={()=>setView("radio")} style={{background:"linear-gradient(135deg,#f0f5ff,#e0eaff)",border:"1.5px solid #b0c8f0",borderRadius:18,padding:"20px 16px",textAlign:"center",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
            <span style={{fontSize:32}}>🔬</span>
            <p style={{fontSize:13,fontWeight:700,color:"#003080",lineHeight:1.3}}>Radyoloji Yorumlat</p>
            <p style={{fontSize:11,color:"#406090"}}>Röntgen, MR, ultrason</p>
          </button>
        </div>
        <div style={{background:"linear-gradient(135deg,#fff0f5,#ffe0ea)",border:"1.5px solid #f0a0b8",borderRadius:20,padding:24,marginBottom:14,textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:6}}>🎗️</div>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:19,color:"#a0003a",fontWeight:700,marginBottom:4}}>LÖSEV'e Bağış Yapın</p>
          <p style={{fontSize:13,color:"#c0004a",lineHeight:1.6,marginBottom:4,fontWeight:600}}>Lösemili Çocuklar Sağlık ve Eğitim Vakfı</p>
          <p style={{fontSize:12,color:"#800030",lineHeight:1.6,marginBottom:14}}>1998'den bu yana lösemili çocuklara ve ailelerine ücretsiz sağlık ve eğitim hizmeti sunuyor. Her bağış bir çocuğa umut oluyor.</p>
          <div style={{background:"#fff",border:"1.5px solid #f0a0b8",borderRadius:12,padding:"12px 16px",marginBottom:14,textAlign:"left"}}>
            <p style={{fontSize:12,fontWeight:700,color:"#a0003a",marginBottom:6}}>🏦 Bağış Hesabı (Ziraat Bankası)</p>
            <p style={{fontSize:12,color:"#600020",lineHeight:1.8}}>
              <strong>Hesap Adı:</strong> LÖSEV Lösemili Çocuklar Sağlık ve Eğitim Vakfı<br/>
              <strong>Şube:</strong> Ankara G.O.P (Kod: 2211)<br/>
              <strong>IBAN:</strong> TR79 0001 0022 1103 4585 1850 47
            </p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:12}}>
            <a href="https://www.losev.org.tr/bagis/bagis.html" target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#c0003a,#e0005a)",color:"#fff",border:"none",borderRadius:100,padding:"11px 20px",fontSize:13,fontWeight:700,boxShadow:"0 6px 18px rgba(192,0,58,.35)",textDecoration:"none"}}>
              💳 Online Bağış Yap
            </a>
            <a href="sms:3406?body=BAĞIŞ" style={{background:"#fff",color:"#c0003a",border:"1.5px solid #f0a0b8",borderRadius:100,padding:"11px 20px",fontSize:13,fontWeight:700,textDecoration:"none"}}>
              📱 SMS ile Bağış (3406)
            </a>
          </div>
          <p style={{fontSize:11,color:"#a06080"}}>SMS bedeli: 550 ₺ · Turkcell, Türk Telekom, Vodafone faturalı hatlardan</p>
        </div>
        <div style={{background:C.card,border:"1.5px solid "+C.border,borderRadius:20,padding:22,marginBottom:14,textAlign:"center"}}>
          <p style={{fontSize:16,fontWeight:700,color:C.primary,marginBottom:4}}>{t("rateTitle")}</p>
          <p style={{fontSize:13,color:C.muted,marginBottom:10}}>{t("rateSubtitle")}</p>
          <div style={{fontSize:28,marginBottom:12,letterSpacing:6}}>⭐⭐⭐⭐⭐</div>
          <button onClick={()=>alert(t("rateAlert"))} style={{background:C.grad,color:"#fff",border:"none",borderRadius:100,padding:"11px 28px",fontSize:14,fontWeight:600,boxShadow:"0 6px 18px rgba(0,180,180,.3)"}}>{t("btnRate")}</button>
        </div>
        <div style={{background:C.card,border:"1.5px solid "+C.border,borderRadius:20,padding:22,textAlign:"center"}}>
          <p style={{fontSize:16,fontWeight:700,color:C.primary,marginBottom:4}}>{t("shareTitle")}</p>
          <p style={{fontSize:13,color:C.muted,marginBottom:14}}>{t("shareSubtitle")}</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {[{label:"𝕏 Twitter",color:"#000",href:"https://twitter.com/intent/tweet?text="+encodeURIComponent(t("appName"))},{label:"WhatsApp",color:"#25d366",href:"https://wa.me/?text="+encodeURIComponent(t("appName"))},{label:"Facebook",color:"#1877f2",href:"https://www.facebook.com/sharer/sharer.php?u=https://neyimvar.app"},{label:"Telegram",color:"#229ed9",href:"https://t.me/share/url?url=https://neyimvar.app&text="+encodeURIComponent(t("appName"))},].map(({label,color,href})=>(
              <button key={label} onClick={()=>window.open(href,"_blank")} style={{background:color,color:"#fff",border:"none",borderRadius:100,padding:"10px 18px",fontSize:13,fontWeight:600,boxShadow:"0 4px 14px "+color+"55"}}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ════════════════════════════════════
  //  VIEW: LOGIN
  // ════════════════════════════════════
  if(view==="login") return (
    <><style>{STYLE}</style><Nav/>
    <div ref={topRef} style={{minHeight:"100vh",background:C.bg,padding:"48px 16px 0"}}>
      <div style={{maxWidth:420,margin:"0 auto"}}>
        {/* FORGOT PASSWORD sub-view */}
        {forgotView?(
          <div className="fi" style={{background:C.card,borderRadius:24,padding:32,boxShadow:"0 8px 40px rgba(10,110,110,.10)",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:10}}>🔑</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:C.primary,marginBottom:6}}>{t("forgotTitle")}</h2>
            <p style={{color:C.muted,fontSize:13,lineHeight:1.6,marginBottom:24}}>{t("forgotSubtitle")}</p>
            <div style={{textAlign:"left",marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:6}}>{t("forgotEmailLabel")}</label>
              <input type="email" placeholder={t("placeholderLoginEmail")} value={forgotEmail}
                onChange={e=>setForgotEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleForgot()}/>
            </div>
            {forgotMsg&&(
              <div style={{background:forgotIsError?"#fff0f0":"#f0fdf8",border:"1.5px solid "+(forgotIsError?"#ffcccc":"#80d8b0"),borderRadius:12,padding:"12px 14px",marginBottom:16,color:forgotIsError?C.danger:"#0a6e4e",fontSize:14,textAlign:"left",lineHeight:1.6}}>
                {forgotMsg}
              </div>
            )}
            <button onClick={handleForgot} style={{width:"100%",padding:"13px",borderRadius:100,border:"none",background:C.grad,color:"#fff",fontSize:15,fontWeight:700,marginBottom:10,boxShadow:"0 6px 18px rgba(0,180,180,.3)"}}>{t("forgotBtnSubmit")}</button>
            <button onClick={()=>{setForgotView(false);setForgotMsg("");setForgotEmail("");}} style={{width:"100%",padding:"11px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:13,fontWeight:500}}>{t("btnBackToLogin")}</button>
          </div>
        ):(
        /* MAIN LOGIN */
        <div className="fi" style={{background:C.card,borderRadius:24,padding:32,boxShadow:"0 8px 40px rgba(10,110,110,.10)",textAlign:"center"}}>
          <div style={{fontSize:52,marginBottom:12}}>🔐</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:C.primary,marginBottom:6}}>{t("loginTitle")}</h2>
          <p style={{color:C.muted,fontSize:14,lineHeight:1.6,marginBottom:24}}>{t("loginSubtitle")}</p>
          <div style={{textAlign:"left",marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:6}}>{t("labelLoginEmail")}</label>
            <input type="email" placeholder={t("placeholderLoginEmail")} value={loginEmail}
              onChange={e=>setLoginEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
          </div>
          <div style={{textAlign:"left",marginBottom:10}}>
            <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:6}}>{t("labelLoginPassword")}</label>
            <div style={{position:"relative"}}>
              <input type={showLoginPw?"text":"password"} placeholder={t("placeholderLoginPassword")} value={loginPassword}
                onChange={e=>setLoginPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{paddingRight:70}}/>
              <button type="button" onClick={()=>setShowLoginPw(v=>!v)}
                style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",fontSize:12,color:C.muted,fontWeight:600,padding:"4px 6px"}}>
                {showLoginPw?t("hidePassword"):t("showPassword")}
              </button>
            </div>
          </div>
          {/* Remember me + Forgot */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:C.text,fontWeight:500}}>
              <input type="checkbox" checked={loginRemember} onChange={e=>setLoginRemember(e.target.checked)}
                style={{width:16,height:16,accentColor:"#0a6e6e"}}/>
              {t("rememberMe")}
            </label>
            <button onClick={()=>{setForgotView(true);setForgotMsg("");setForgotEmail(loginEmail);}}
              style={{background:"none",border:"none",fontSize:13,color:C.accent,fontWeight:600,textDecoration:"underline",cursor:"pointer"}}>
              {t("forgotPassword")}
            </button>
          </div>
          {loginError&&(
            <div style={{background:"#fff0f0",border:"1.5px solid #ffcccc",borderRadius:12,padding:"10px 14px",marginBottom:16,color:C.danger,fontSize:13,textAlign:"left"}}>
              {loginError}
            </div>
          )}
          <button onClick={handleLogin} style={{width:"100%",padding:"14px",borderRadius:100,border:"none",background:C.grad,color:"#fff",fontSize:15,fontWeight:700,boxShadow:"0 8px 24px rgba(0,180,180,.35)",marginBottom:12}}>
            {t("btnLoginSubmit")}
          </button>
          <button onClick={()=>setView("subscribe")} style={{width:"100%",padding:"12px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:14,fontWeight:500,marginBottom:8}}>
            {t("btnGoRegister")}
          </button>
          <button onClick={()=>setView("home")} style={{width:"100%",padding:"10px",borderRadius:100,border:"none",background:"transparent",color:C.muted,fontSize:13}}>
            {t("navBack")}
          </button>
        </div>
        )}
      </div>
    </div></>
  );

  // ════════════════════════════════════
  //  VIEW: SUBSCRIBE
  // ════════════════════════════════════
  if(view==="subscribe") return (
    <><style>{STYLE}</style><Nav/>
    {showEmergencyCard&&<EmergencyCard/>}
    <div ref={topRef} style={{minHeight:"100vh",background:C.bg,padding:"28px 16px 0"}}>
      <div style={{maxWidth:500,margin:"0 auto"}}>
        <div className="fi" style={{background:C.card,borderRadius:24,padding:32,boxShadow:"0 8px 40px rgba(10,110,110,.10)",marginBottom:24}}>
          <div style={{background:"linear-gradient(135deg,#e8fdf5,#d0f5e8)",border:"1.5px solid #80d8b0",borderRadius:14,padding:"14px 18px",marginBottom:20,textAlign:"center"}}>
            <p style={{fontSize:15,fontWeight:700,color:"#0a6e4e",marginBottom:2}}>{t("memberBenefit")}</p>
            <p style={{fontSize:13,color:"#1a5e3e",lineHeight:1.5}}>{t("memberBenefitText")}</p>
          </div>
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{fontSize:48,marginBottom:8}}>📧</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:C.primary,marginBottom:6}}>{t("subscribeTitle")}</h2>
            <p style={{color:C.muted,fontSize:14,lineHeight:1.6}}>{t("subscribeSubtitle")}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
            <div><label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("labelFirst")}</label><input placeholder={t("placeholderFirst")} value={subForm.firstName} onChange={e=>setSubForm(f=>({...f,firstName:e.target.value}))}/></div>
            <div><label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("labelLast")}</label><input placeholder={t("placeholderLast")} value={subForm.lastName} onChange={e=>setSubForm(f=>({...f,lastName:e.target.value}))}/></div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("labelEmail")}</label>
            <input type="email" placeholder={t("placeholderEmail")} value={subForm.email} onChange={e=>setSubForm(f=>({...f,email:e.target.value}))}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("labelPhone")} <span style={{color:C.muted,fontWeight:400,fontSize:12}}>{t("phoneSub")}</span></label>
            <input type="tel" placeholder={t("placeholderPhone")} value={subForm.phone} onChange={e=>setSubForm(f=>({...f,phone:e.target.value}))}/>
          </div>
          {/* Password */}
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("labelPassword")} <span style={{color:C.danger,fontWeight:700}}>*</span></label>
            <div style={{position:"relative"}}>
              <input type={showSubPw?"text":"password"} placeholder={t("placeholderPassword")} value={subForm.password}
                onChange={e=>setSubForm(f=>({...f,password:e.target.value}))} style={{paddingRight:70}}/>
              <button type="button" onClick={()=>setShowSubPw(v=>!v)}
                style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",fontSize:12,color:C.muted,fontWeight:600,padding:"4px 6px"}}>
                {showSubPw?t("hidePassword"):t("showPassword")}
              </button>
            </div>
            {/* Password strength indicator */}
            {subForm.password&&(()=>{
              const pw=subForm.password;
              const checks=[pw.length>=8,/[A-Z]/.test(pw),/[a-z]/.test(pw),/[^A-Za-z0-9]/.test(pw)];
              const score=checks.filter(Boolean).length;
              const colors=["#e05c5c","#f0a500","#f0a500","#2ea87e","#2ea87e"];
              const labels=["","Çok zayıf","Zayıf","Orta","Güçlü"];
              return (
                <div style={{marginTop:8}}>
                  <div style={{display:"flex",gap:4,marginBottom:4}}>
                    {[0,1,2,3].map(i=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<score?colors[score]:"#e0e0e0",transition:"background .3s"}}/>)}
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4}}>
                    <span style={{fontSize:11,color:colors[score]||C.muted,fontWeight:600}}>{labels[score]||""}</span>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {[["8+ karakter",pw.length>=8],["Büyük harf",/[A-Z]/.test(pw)],["Küçük harf",/[a-z]/.test(pw)],["Noktalama",/[^A-Za-z0-9]/.test(pw)]].map(([lbl,ok])=>(
                        <span key={lbl} style={{fontSize:10,color:ok?C.success:C.muted}}>{ok?"✓":"✗"} {lbl}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("labelPasswordConfirm")} <span style={{color:C.danger,fontWeight:700}}>*</span></label>
            <input type={showSubPw?"text":"password"} placeholder={t("placeholderPasswordConfirm")} value={subForm.passwordConfirm}
              onChange={e=>setSubForm(f=>({...f,passwordConfirm:e.target.value}))} style={{borderColor:subForm.passwordConfirm&&subForm.passwordConfirm!==subForm.password?"#e05c5c":"#d0e8e8"}}/>
            {subForm.passwordConfirm&&subForm.passwordConfirm!==subForm.password&&(
              <p style={{fontSize:11,color:C.danger,marginTop:4}}>✗ {t("subErrorPasswordMatch")}</p>
            )}
            {subForm.passwordConfirm&&subForm.passwordConfirm===subForm.password&&(
              <p style={{fontSize:11,color:C.success,marginTop:4}}>✓ Şifreler eşleşiyor</p>
            )}
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("passwordHintLabel")}</label>
            <input type="text" placeholder={t("passwordHintPlaceholder")} value={subForm.passwordHint}
              onChange={e=>setSubForm(f=>({...f,passwordHint:e.target.value}))}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("labelGender")}</label>
            <div style={{display:"flex",gap:8}}>
              {[["Kadın",t("genderF")],["Erkek",t("genderM")],["Belirtmiyorum",t("genderN")]].map(([val,lbl])=>(
                <button key={val} onClick={()=>setSubForm(f=>({...f,gender:val}))} style={{flex:1,padding:"10px 4px",borderRadius:12,fontSize:12,fontWeight:500,border:"1.5px solid "+(subForm.gender===val?C.accent:C.border),background:subForm.gender===val?C.light:"#fff",color:subForm.gender===val?C.primary:C.muted}}>{lbl}</button>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
            <div><label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("labelCountry")}</label><div style={{padding:"12px 16px",border:"1.5px solid #d0e8e8",borderRadius:12,fontSize:15,color:C.text,background:"#f8fafb"}}>🇹🇷 Türkiye</div></div>
            <div><label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:5}}>{t("labelBirthYear")}</label><input type="number" placeholder={t("placeholderBirthYear")} min="1920" max="2010" value={subForm.birthYear} onChange={e=>setSubForm(f=>({...f,birthYear:e.target.value}))}/></div>
          </div>
          {/* Location consent */}
          <div style={{background:"#f0f8ff",border:"1.5px solid #b0d4f0",borderRadius:14,padding:"14px 18px",marginBottom:14}}>
            <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}}>
              <input type="checkbox" checked={subForm.locationOk} onChange={e=>setSubForm(f=>({...f,locationOk:e.target.checked}))} style={{width:18,height:18,marginTop:2,flexShrink:0,accentColor:"#0a6e6e"}}/>
              <span style={{fontSize:13,color:"#1a3a5e",lineHeight:1.6}}>
                <strong>{t("locationConsentTitle")}</strong> <span style={{fontWeight:400,color:C.muted}}>{t("locationConsentOptional")}</span><br/>
                {t("locationConsentText")}
              </span>
            </label>
          </div>
          {/* KVKK */}
          <div style={{background:"#f4f8ff",border:"1.5px solid #c8d8f0",borderRadius:14,padding:"16px 18px",marginBottom:16}}>
            <p style={{fontSize:12,fontWeight:700,color:"#2a4a7e",marginBottom:8,textTransform:"uppercase",letterSpacing:.4}}>{t("kvkkTitle")}</p>
            <div style={{fontSize:12,color:"#3a4a6e",lineHeight:1.8,marginBottom:12,maxHeight:140,overflowY:"auto",paddingRight:4}}>
              <p style={{marginBottom:6}}>{t("kvkkBody1",t("appName"))}</p>
              <p style={{marginBottom:6}}><strong>{t("kvkkBody2")}</strong></p>
              <p style={{marginBottom:6}}>{t("kvkkBody3")}</p>
              <p>{t("kvkkBody4")}</p>
            </div>
            <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}}>
              <input type="checkbox" checked={subForm.kvkkOk} onChange={e=>setSubForm(f=>({...f,kvkkOk:e.target.checked}))} style={{width:18,height:18,marginTop:1,flexShrink:0,accentColor:"#0a6e6e",borderRadius:4}}/>
              <span style={{fontSize:13,color:"#2a4a6e",lineHeight:1.5}}>{t("kvkkConsent")}</span>
            </label>
          </div>
          {subError&&<div style={{background:"#fff0f0",border:"1.5px solid #ffcccc",borderRadius:12,padding:"10px 14px",marginBottom:14,color:C.danger,fontSize:13}}>{subError}</div>}
          <button onClick={handleSubscribe} style={{width:"100%",padding:"14px",borderRadius:100,border:"none",background:C.grad,color:"#fff",fontSize:15,fontWeight:700,boxShadow:"0 8px 24px rgba(0,180,180,.35)",marginBottom:10}}>{t("btnRegister")}</button>
          <button onClick={()=>setView("home")} style={{width:"100%",padding:"12px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:14,fontWeight:500}}>{t("btnContinueGuest")}</button>
        </div>
      </div>
      <Bottom/>
    </div></>
  );


  // ════════════════════════════════════
  //  VIEW: BELİRTİ TAKİP GRAFİĞİ
  // ════════════════════════════════════
  if(view==="graph") return (
    <><style>{STYLE}</style><Nav/>
    <div ref={topRef} style={{minHeight:"100vh",background:C.bg,padding:"28px 16px 0"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <button onClick={()=>setView("home")} style={{background:"#fff",border:"1.5px solid "+C.border,borderRadius:100,padding:"8px 16px",fontSize:13,fontWeight:600,color:C.muted}}>← Geri</button>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:C.primary}}>📊 Belirti Takip Grafiği</h2>
        </div>
        {history.length===0?(
          <div style={{textAlign:"center",padding:60,color:C.muted}}>
            <div style={{fontSize:48,marginBottom:12}}>📭</div>
            <p style={{fontSize:15}}>Henüz sorgu geçmişiniz yok.</p>
          </div>
        ):(()=>{
          // En sık geçen belirtileri hesapla
          const symCount={};
          history.forEach(h=>{ (h.symptoms||[]).forEach(s=>{ symCount[s]=(symCount[s]||0)+1; }); });
          const sorted=Object.entries(symCount).sort((a,b)=>b[1]-a[1]).slice(0,10);
          const max=sorted[0]?.[1]||1;
          return (
            <div>
              <div style={{background:C.card,borderRadius:20,padding:24,marginBottom:16,boxShadow:"0 4px 20px rgba(10,110,110,.08)"}}>
                <p style={{fontSize:14,fontWeight:600,color:C.primary,marginBottom:16}}>En Sık Yaşanan Belirtiler</p>
                {sorted.map(([sym,count])=>(
                  <div key={sym} style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:13,color:C.text,fontWeight:500}}>{sym}</span>
                      <span style={{fontSize:13,fontWeight:700,color:C.primary}}>{count} kez</span>
                    </div>
                    <div style={{background:C.border,borderRadius:100,height:8,overflow:"hidden"}}>
                      <div style={{height:"100%",borderRadius:100,width:`${(count/max)*100}%`,background:C.grad,transition:"width 1s ease"}}/>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:C.card,borderRadius:20,padding:24,marginBottom:16,boxShadow:"0 4px 20px rgba(10,110,110,.08)"}}>
                <p style={{fontSize:14,fontWeight:600,color:C.primary,marginBottom:16}}>Sorgu Zaman Çizelgesi</p>
                {history.slice(0,8).map((h,i)=>{
                  const emerg=h.result?.diagnoses?.some(d=>d.urgency==="acil"||d.urgency==="emergency");
                  return (
                    <div key={h.id} style={{display:"flex",gap:12,marginBottom:12,alignItems:"flex-start"}}>
                      <div style={{width:36,height:36,borderRadius:"50%",background:emerg?"#fff0f0":C.light,border:"2px solid "+(emerg?C.danger:C.accent),display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
                        {emerg?"🚨":"🩺"}
                      </div>
                      <div style={{flex:1}}>
                        <p style={{fontSize:12,fontWeight:700,color:C.primary,marginBottom:2}}>{h.date} — {h.time}</p>
                        <p style={{fontSize:12,color:C.muted}}>{(h.symptoms||[]).slice(0,3).join(", ")}{h.symptoms?.length>3?` +${h.symptoms.length-3} daha`:""}</p>
                        {h.result?.diagnoses?.[0]&&<p style={{fontSize:12,color:C.text,fontWeight:500,marginTop:2}}>→ {h.result.diagnoses[0].name} (%{h.result.diagnoses[0].probability})</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
      <Bottom/>
    </div></>
  );

  // ════════════════════════════════════
  //  VIEW: KAN TAHLİLİ YORUMLAMA
  // ════════════════════════════════════
  if(view==="blood") return (
    <><style>{STYLE}</style><Nav/>
    <div ref={topRef} style={{minHeight:"100vh",background:C.bg,padding:"28px 16px 0"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <button onClick={()=>setView("home")} style={{background:"#fff",border:"1.5px solid "+C.border,borderRadius:100,padding:"8px 16px",fontSize:13,fontWeight:600,color:C.muted}}>← Geri</button>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:C.primary}}>🩸 Kan Tahlili Yorumlama</h2>
        </div>
        <BloodTestView/>
      </div>
      <Bottom/>
    </div></>
  );

  // ════════════════════════════════════
  //  VIEW: RADYOLOJİ GÖRÜNTÜSÜ
  // ════════════════════════════════════
  if(view==="radio") return (
    <><style>{STYLE}</style><Nav/>
    <div ref={topRef} style={{minHeight:"100vh",background:C.bg,padding:"28px 16px 0"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <button onClick={()=>setView("home")} style={{background:"#fff",border:"1.5px solid "+C.border,borderRadius:100,padding:"8px 16px",fontSize:13,fontWeight:600,color:C.muted}}>← Geri</button>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:C.primary}}>🔬 Radyoloji Görüntüsü Yorumlama</h2>
        </div>
        <RadiologyView/>
      </div>
      <Bottom/>
    </div></>
  );


  // ════════════════════════════════════
  //  VIEW: ADMIN PANELİ
  // ════════════════════════════════════
  if(view==="admin" && adminUser) return (
    <><style>{STYLE}</style><Nav/>
    <div ref={topRef} style={{minHeight:"100vh",background:C.bg,padding:"28px 16px 0"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <button onClick={()=>setView("home")} style={{background:"#fff",border:"1.5px solid "+C.border,borderRadius:100,padding:"8px 16px",fontSize:13,fontWeight:600,color:C.muted}}>← Geri</button>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:C.primary}}>⚙️ Admin Paneli</h2>
        </div>
        <AdminPanel/>
      </div>
      <Bottom/>
    </div></>
  );

  // ════════════════════════════════════
  //  VIEW: HISTORY
  // ════════════════════════════════════
  if(view==="history") return (
    <><style>{STYLE}</style><Nav/>
    <div ref={topRef} style={{minHeight:"100vh",background:C.bg,padding:"28px 16px 0"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <button onClick={()=>setView("home")} style={{background:"#fff",border:"1.5px solid "+C.border,borderRadius:100,padding:"8px 16px",fontSize:13,fontWeight:600,color:C.muted}}>{t("navBack")}</button>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:C.primary}}>{t("historyTitle")}</h2>
        </div>
        {history.length===0?(
          <div style={{textAlign:"center",padding:60,color:C.muted}}><div style={{fontSize:48,marginBottom:12}}>📭</div><p style={{fontSize:15}}>{t("historyEmpty")}</p></div>
        ):history.map((entry,i)=>{
          const isOpen=expandedIdx===i;
          const emerg=entry.result?.diagnoses?.some(d=>d.urgency==="acil"||d.urgency==="emergency");
          return (
            <div key={entry.id} className="fi" style={{background:C.card,borderRadius:18,marginBottom:12,overflow:"hidden",border:"1.5px solid "+(emerg?C.danger:C.border),boxShadow:"0 4px 16px rgba(10,110,110,.07)"}}>
              <div onClick={()=>setExpandedIdx(isOpen?null:i)} style={{padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    {emerg&&<span style={{fontSize:11,background:"#fff0f0",color:C.danger,padding:"2px 8px",borderRadius:100,fontWeight:700}}>{t("historyEmergencyTag")}</span>}
                    <span style={{fontSize:13,fontWeight:700,color:C.primary}}>{entry.date} — {entry.time}</span>
                  </div>
                  <div style={{fontSize:12,color:C.muted}}>{entry.symptoms.slice(0,4).join(", ")}{entry.symptoms.length>4?` +${entry.symptoms.length-4}`:""}</div>
                </div>
                <span style={{fontSize:18,color:C.muted}}>{isOpen?"▲":"▼"}</span>
              </div>
              {isOpen&&(
                <div style={{borderTop:"1px solid "+C.border,padding:"16px 20px"}}>
                  <p style={{fontSize:13,color:C.muted,marginBottom:12,lineHeight:1.6}}>{entry.result?.summary}</p>
                  {entry.result?.diagnoses?.map((d,j)=>(
                    <div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:j<entry.result.diagnoses.length-1?"1px solid "+C.border:"none"}}>
                      <span style={{fontSize:13,fontWeight:600,color:C.text}}>{d.name}</span>
                      <span style={{fontSize:13,fontWeight:700,color:C.primary,background:C.light,borderRadius:100,padding:"3px 10px"}}>%{d.probability}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Bottom/>
    </div></>
  );

  // ════════════════════════════════════
  //  VIEW: HOME / APP
  // ════════════════════════════════════
  return (
    <><style>{STYLE}</style><Nav/>
    {showPayModal&&<PayModal/>}
    {showEmergencyCard&&<EmergencyCard/>}
    <div ref={topRef} style={{minHeight:"100vh",background:C.bg,padding:"28px 16px 0"}}>

      {step>0&&step<3&&(
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:24}}>
          {[t("stepProfile"),t("stepSymptoms"),t("stepAnalysis")].map((label,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,background:i<=step?C.grad:C.border,color:i<=step?"#fff":C.muted,boxShadow:i===step?"0 4px 12px rgba(0,180,180,.35)":"none"}}>{i+1}</div>
              <span style={{fontSize:13,color:i<=step?C.primary:C.muted,fontWeight:i===step?600:400}}>{label}</span>
              {i<2&&<span style={{color:C.border,fontSize:18,marginLeft:2}}>›</span>}
            </div>
          ))}
        </div>
      )}

      <div style={{maxWidth:600,margin:"0 auto"}}>

        {/* STEP 0 */}
        {step===0&&(
          <div className="fi" style={{background:C.card,borderRadius:24,padding:36,boxShadow:"0 8px 40px rgba(10,110,110,.10)",textAlign:"center",marginBottom:20}}>
            {subscriber&&<div style={{background:C.light,borderRadius:12,padding:"10px 16px",marginBottom:16,fontSize:14,color:C.primary,fontWeight:500}}>{t("welcome",subscriber.firstName,subscriber.lastName)}</div>}
            <div style={{background:freeRemaining>0?"#e8fdf5":"#fff8e6",border:"1.5px solid "+(freeRemaining>0?"#80d8b0":"#f0d090"),borderRadius:12,padding:"10px 16px",marginBottom:16,fontSize:13,fontWeight:600,color:freeRemaining>0?"#0a6e4e":"#7a5000"}}>
              {adminUser?"♾️ Sınırsız":freeRemaining>0?t("freeQueriesLeft",freeRemaining):t("nextQueryCost",currency.label)}
            </div>
            <div style={{fontSize:68,marginBottom:14}}>🔬</div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:30,color:C.primary,marginBottom:12}}>{t("introTitle")}</h1>
            <p style={{color:C.muted,lineHeight:1.7,marginBottom:8,fontSize:15}}>{t("introSubtitle")}</p>
            <div style={{background:"#fff8e6",border:"1.5px solid #f0d090",borderRadius:12,padding:"14px 16px",margin:"16px 0",textAlign:"left"}}>
              <p style={{color:"#8a6000",fontSize:13,lineHeight:1.6}}>{t("introWarning")}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24,textAlign:"left"}}>
              {[t("introStep1"),t("introStep2"),t("introStep3")].map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:C.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{i+1}</div>
                  <span style={{color:C.text,fontSize:15}}>{item}</span>
                </div>
              ))}
            </div>

              {/* Hızlı Erişim Kartları */}
              {subscriber && (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
                  {[
                    {icon:"🩸",label:lang==="tr"?"Kan Tahlili":"Blood Test",view:"blood",bg:"#fff0f5",border:"#f0a0b8",color:"#a0003a"},
                    {icon:"🔬",label:lang==="tr"?"Radyoloji":"Radiology",view:"radio",bg:"#f0f5ff",border:"#b0c8f0",color:"#003080"},
                    {icon:"📊",label:lang==="tr"?"Grafikler":"Graphs",view:"graph",bg:C.light,border:C.accent,color:C.primary},
                  ].map(({icon,label,view:v,bg,border,color})=>(
                    <button key={v} onClick={()=>setView(v)} style={{background:bg,border:"1.5px solid "+border,borderRadius:16,padding:"14px 8px",textAlign:"center",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                      <span style={{fontSize:24}}>{icon}</span>
                      <span style={{fontSize:11,fontWeight:600,color,lineHeight:1.3}}>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <button onClick={()=>setStep(1)} style={{flex:2,background:C.grad,color:"#fff",border:"none",borderRadius:100,padding:"14px 20px",fontSize:16,fontWeight:600,boxShadow:"0 8px 24px rgba(0,180,180,.35)"}}>{t("btnStart")}</button>
              {!subscriber&&<>
                <button onClick={()=>setView("subscribe")} style={{flex:1,background:C.grad,color:"#fff",border:"none",borderRadius:100,padding:"14px 12px",fontSize:14,fontWeight:700,boxShadow:"0 6px 18px rgba(0,180,180,.3)"}}>{t("btnSubscribe")}</button>
                <button onClick={()=>setView("login")} style={{flex:1,background:"#fff",color:C.primary,border:"1.5px solid "+C.accent,borderRadius:100,padding:"14px 12px",fontSize:14,fontWeight:600}}>{t("btnLogin")}</button>
              </>}
            </div>
          </div>
        )}

        {/* STEP 1 */}
        {step===1&&(
          <div className="fi" style={{background:C.card,borderRadius:24,padding:32,boxShadow:"0 8px 40px rgba(10,110,110,.10)"}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:C.primary,marginBottom:6}}>{t("profileTitle")}</h2>
            <p style={{color:C.muted,fontSize:14,marginBottom:20}}>{t("profileSubtitle")}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <div><label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:6}}>{t("labelHeight")}</label><input type="number" placeholder={t("placeholderHeight")} min="100" max="250" value={profile.height} onChange={e=>{ setProfile(p=>({...p,height:e.target.value})); mem.set("savedHeight",e.target.value); if(subscriber)sb.updateProfile(subscriber.email,e.target.value,profile.weight); }}/></div>
              <div><label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:6}}>{t("labelWeight")}</label><input type="number" placeholder={t("placeholderWeight")} min="20" max="300" value={profile.weight} onChange={e=>{ setProfile(p=>({...p,weight:e.target.value})); mem.set("savedWeight",e.target.value); if(subscriber)sb.updateProfile(subscriber.email,profile.height,e.target.value); }}/></div>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:6}}>{t("labelGender")}</label>
              <div style={{display:"flex",gap:10}}>
                {[["Kadın",t("genderF")],["Erkek",t("genderM")],["Belirtmek istemiyorum",t("genderN")]].map(([val,lbl])=>(
                  <button key={val} onClick={()=>setProfile(p=>({...p,gender:val}))} style={{flex:1,padding:"11px 8px",borderRadius:12,fontSize:13,fontWeight:500,border:"1.5px solid "+(profile.gender===val?C.accent:C.border),background:profile.gender===val?C.light:"#fff",color:profile.gender===val?C.primary:C.muted}}>{lbl}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:6}}>{t("labelCountry")}</label>
              <div style={{padding:"12px 16px",border:"1.5px solid #d0e8e8",borderRadius:12,fontSize:15,color:C.text,background:"#f8fafb",display:"flex",alignItems:"center",gap:8}}>
                🇹🇷 Türkiye
              </div>
            </div>
            {profile.height&&profile.weight&&(()=>{
              const bmi=parseFloat(profile.weight)/Math.pow(parseFloat(profile.height)/100,2);
              const cat=bmi<18.5?t("bmiUnder"):bmi<25?t("bmiNormal"):bmi<30?t("bmiOver"):t("bmiObese");
              return <div style={{background:C.light,borderRadius:12,padding:"12px 16px",marginBottom:16,display:"flex",gap:16}}><span style={{fontSize:13,color:C.primary}}><strong>{t("labelBMI")}:</strong> {bmi.toFixed(1)}</span><span style={{fontSize:13,color:C.primary}}><strong>{t("labelBMICat")}:</strong> {cat}</span></div>;
            })()}
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setStep(0)} style={{flex:1,padding:"13px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:15,fontWeight:500}}>{t("navBack")}</button>
              <button onClick={()=>setStep(2)} disabled={!profileOk} style={{flex:2,padding:"13px",borderRadius:100,border:"none",background:profileOk?C.grad:C.border,color:"#fff",fontSize:15,fontWeight:600,opacity:profileOk?1:0.7}}>{t("btnContinue")}</button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step===2&&(
          <div className="fi" style={{background:C.card,borderRadius:24,padding:32,boxShadow:"0 8px 40px rgba(10,110,110,.10)"}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:C.primary,marginBottom:6}}>{t("symptomsTitle")}</h2>
            <p style={{color:C.muted,fontSize:14,marginBottom:8}}>{t("symptomsSubtitle")}</p>
            <div style={{background:freeRemaining>0?"#e8fdf5":"#fff8e6",border:"1.5px solid "+(freeRemaining>0?"#80d8b0":"#f0d090"),borderRadius:10,padding:"8px 14px",marginBottom:16,fontSize:12,fontWeight:600,color:freeRemaining>0?"#0a6e4e":"#7a5000",display:"inline-block"}}>
              {freeRemaining>0?t("freeLeft",freeRemaining):t("paidQuery",currency.label)}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
              {symptoms.map(s=>{const sel=selSym.includes(s);return(<button key={s} onClick={()=>toggleSym(s)} style={{padding:"8px 14px",borderRadius:100,fontSize:13,fontWeight:500,border:"1.5px solid "+(sel?C.accent:C.border),background:sel?C.light:"#fff",color:sel?C.primary:C.muted,boxShadow:sel?"0 2px 8px rgba(0,180,180,.2)":"none"}}>{sel?"✓ ":""}{s}</button>);})}
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:600,color:C.text,display:"block",marginBottom:6}}>{t("labelAddSymptom")}</label>
              <div style={{display:"flex",gap:8}}>
                <input placeholder={t("placeholderSymptom")} value={customSym} onChange={e=>setCustomSym(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCustom()}/>
                <button onClick={addCustom} style={{padding:"12px 20px",borderRadius:12,border:"none",background:C.grad,color:"#fff",fontWeight:600,fontSize:14,whiteSpace:"nowrap"}}>{t("btnAdd")}</button>
              </div>
            </div>
            {selSym.length>0&&(
              <div style={{background:C.light,borderRadius:12,padding:"14px 16px",marginBottom:16}}>
                <p style={{fontSize:13,fontWeight:600,color:C.primary,marginBottom:8}}>{t("selectedSymptoms",selSym.length)}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {selSym.map(s=><span key={s} style={{background:C.accent,color:"#fff",borderRadius:100,padding:"4px 12px",fontSize:12,fontWeight:500,display:"flex",alignItems:"center",gap:6}}>{s}<span onClick={()=>toggleSym(s)} style={{cursor:"pointer",opacity:.8}}>✕</span></span>)}
                </div>
              </div>
            )}
            {error&&<div style={{background:"#fff0f0",border:"1.5px solid #ffcccc",borderRadius:12,padding:"12px 16px",marginBottom:14,color:C.danger,fontSize:13}}>{error}</div>}
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setStep(1)} style={{flex:1,padding:"13px",borderRadius:100,border:"1.5px solid "+C.border,background:"#fff",color:C.muted,fontSize:15,fontWeight:500}}>{t("navBack")}</button>
              <button onClick={tryAnalyze} disabled={!symptomsOk||loading} style={{flex:2,padding:"13px",borderRadius:100,border:"none",background:symptomsOk?C.grad:C.border,color:"#fff",fontSize:15,fontWeight:600,boxShadow:symptomsOk?"0 6px 20px rgba(0,180,180,.3)":"none",opacity:(symptomsOk&&!loading)?1:0.7,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                {loading?<><div style={{width:18,height:18,border:"2px solid rgba(255,255,255,.4)",borderTop:"2px solid #fff",borderRadius:"50%"}} className="spin"/>{t("analyzing")}</>:isFreeQuery?t("btnAnalyze"):t("btnPayAnalyze",currency.label)}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step===3&&result&&(
          <div className="fi">
            {hasEmergency&&(
              <div className="ep" style={{background:"#cc2222",borderRadius:22,padding:"24px 28px",marginBottom:22,textAlign:"center",border:"3px solid #aa1111"}}>
                <div style={{fontSize:44,marginBottom:8}}>🚨</div>
                <p style={{fontSize:22,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:1,marginBottom:8,lineHeight:1.2}}>{t("emergencyTitle")}</p>
                <p style={{fontSize:16,fontWeight:700,color:"#fff",lineHeight:1.6,marginBottom:8}}><u>{t("emergencyBody")}</u></p>
                <p style={{fontSize:15,color:"rgba(255,255,255,.92)",lineHeight:1.6,marginBottom:18}}>{t("emergencySubBody")}</p>
                <a href={"tel:"+(getEmergency(profile.country||subscriber?.country||"Diğer").ambulance)} style={{display:"inline-block",background:"#fff",color:"#cc2222",borderRadius:100,padding:"13px 36px",fontSize:18,fontWeight:800,textDecoration:"none",boxShadow:"0 4px 20px rgba(0,0,0,.25)"}}>
                  {t("emergencyCall",getEmergency(profile.country||subscriber?.country||"Diğer").label)}
                </a>
              </div>
            )}
            <div style={{background:C.grad,borderRadius:24,padding:24,marginBottom:20,color:"#fff",boxShadow:"0 8px 32px rgba(10,110,110,.3)"}}>
              <div style={{fontSize:13,opacity:.85,marginBottom:4}}>{t("analysisSummary")}</div>
              <p style={{fontSize:15,lineHeight:1.7,fontWeight:300}}>{result.summary}</p>
            </div>
            <div style={{marginBottom:20}}>
              {result.diagnoses?.map((d,i)=>(
                <div key={i} className="fi" style={{background:C.card,borderRadius:20,padding:24,marginBottom:14,boxShadow:"0 4px 20px rgba(10,110,110,.08)",border:"1.5px solid "+(d.urgency==="acil"||d.urgency==="emergency"?C.danger:i===0?C.accent:C.border),animationDelay:i*.1+"s"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      {i===0&&<span style={{background:C.accent,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:100,marginBottom:6,display:"inline-block"}}>{t("topMatch")}</span>}
                      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:C.primary,display:"block"}}>{d.name}</h3>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:32,fontWeight:700,color:C.primary,fontFamily:"'Playfair Display',serif",lineHeight:1}}>%{d.probability}</div>
                      <div style={{fontSize:11,color:C.muted}}>{t("matchRate")}</div>
                    </div>
                  </div>
                  <div style={{background:C.border,borderRadius:100,height:6,marginBottom:14,overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:100,width:d.probability+"%",background:d.urgency==="acil"||d.urgency==="emergency"?"linear-gradient(90deg,#e05c5c,#f09090)":C.grad}}/>
                  </div>
                  <p style={{color:C.muted,fontSize:14,lineHeight:1.6,marginBottom:14}}>{d.description}</p>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
                    <span style={{fontSize:12,fontWeight:600,padding:"4px 12px",borderRadius:100,background:sevColor(d.severity)+"20",color:sevColor(d.severity)}}>● {sevLabel(d.severity)}</span>
                    <span style={{fontSize:12,fontWeight:600,padding:"4px 12px",borderRadius:100,background:urgColor(d.urgency)+"15",color:urgColor(d.urgency)}}>{urgLabel(d.urgency)}</span>
                  </div>
                  {d.additionalSymptoms?.length>0&&(
                    <div style={{background:"#f8f9fa",borderRadius:12,padding:"12px 14px"}}>
                      <p style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>{t("additionalIf")}</p>
                      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{d.additionalSymptoms.map((a,j)=><span key={j} style={{fontSize:12,background:"#fff",border:"1px solid "+C.border,borderRadius:100,padding:"3px 10px",color:C.text}}>+ {a}</span>)}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{background:"#fff8e6",border:"1.5px solid #f0d090",borderRadius:20,padding:22,marginBottom:14}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{fontSize:28}}>👨‍⚕️</span>
                <div>
                  <p style={{fontSize:14,fontWeight:700,color:"#7a5000",marginBottom:6}}>{t("doctorAdvice")}</p>
                  <p style={{fontSize:14,color:"#8a6500",lineHeight:1.6}}>{result.doctorAdvice}</p>
                </div>
              </div>
            </div>
            <div style={{background:"#fff0f0",border:"1.5px solid #ffcccc",borderRadius:16,padding:"16px 20px",marginBottom:16}}>
              <p style={{fontSize:13,color:"#cc4444",lineHeight:1.7}}>⚠️ {t("disclaimer")}</p>
            </div>
            <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
              <button onClick={handleEmergency} style={{flex:2,padding:"13px 10px",borderRadius:100,border:"none",background:"linear-gradient(135deg,#cc2222,#e05c5c)",color:"#fff",fontSize:14,fontWeight:700,boxShadow:"0 6px 20px rgba(204,34,34,.35)",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                {t("btnEmergency")}
              </button>
              {subscriber?.locationOk&&<ShareLocation/>}
            </div>
            <button onClick={resetApp} style={{width:"100%",padding:"14px",borderRadius:100,border:"none",background:C.grad,color:"#fff",fontSize:15,fontWeight:600,boxShadow:"0 6px 20px rgba(0,180,180,.3)",marginBottom:28}}>{t("btnNewAnalysis")}</button>
          </div>
        )}
      </div>
      <Bottom/>
    </div></>
  );
}
