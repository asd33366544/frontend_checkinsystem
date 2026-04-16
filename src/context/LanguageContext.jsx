import React, { createContext, useContext, useState, useEffect } from 'react';

const dictionary = {
  en: {
    dashboard: 'Dashboard',
    bookAppointment: 'Book Appointment',
    myAppointments: 'My Appointments',
    home: 'Home',
    signIn: 'Sign In',
    register: 'Register',
    signOut: 'Sign Out',
    patient: 'Patient',
    getStarted: 'Get Started',
    badge: 'Online Appointment Booking',
    heroLine1: 'Your health,',
    heroLine2: 'your schedule.',
    heroDesc: 'SynCare makes it simple to book specialist appointments, manage your medical visits, and stay on top of your health — all in one place.',
    heroBookBtn: 'Book Appointment',
    heroDashBtn: 'Go to Dashboard',
    heroFreeBtn: 'Get Started Free',
    heroSignInBtn: 'Sign In',
    statSpecialties: 'Specialties',
    statOnlineBooking: 'Online Booking',
    statSecure: 'Secure & Private',
    statWaitLine: 'Waiting in Line',
    ourSpecialties: 'Our Specialties',
    specialtiesDesc: 'World-class care across departments — book any of them in seconds.',
    heartClinic: 'Heart Clinic',
    heartDesc: 'Cardiology & heart disease management.',
    brainClinic: 'Brain & Nerves',
    brainDesc: 'Neurological evaluation and care.',
    eyeClinic: 'Eye Clinic',
    eyeDesc: 'Vision tests and eye treatment.',
    bonesClinic: 'Bones & Joints',
    bonesDesc: 'Orthopedic care and joint therapy.',
    womenClinic: 'Women\'s Health',
    womenDesc: 'OB/GYN and women-specific care.',
    childrenClinic: 'Children\'s Health',
    childrenDesc: 'Pediatric consultations for all ages.',
    readyToBook: 'Ready to book your appointment?',
    joinThousands: 'Join thousands of patients who manage their health with SynCare.',
    bookNow: 'Book Now',
    createFreeAccount: 'Create Free Account',
    footerBuiltWithCare: 'SynCare. Built with care.'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    bookAppointment: 'حجز موعد',
    myAppointments: 'مواعيدي',
    home: 'الرئيسية',
    signIn: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    signOut: 'تسجيل الخروج',
    patient: 'مريض',
    getStarted: 'ابدأ الآن',
    badge: 'حجز المواعيد عبر الإنترنت',
    heroLine1: 'صحتك،',
    heroLine2: 'جدولك الخاص.',
    heroDesc: 'يساعدك SynCare على حجز مواعيد الأطباء المتخصصين، وإدارة زياراتك الطبية، والحفاظ على صحتك - كل ذلك في مكان واحد.',
    heroBookBtn: 'احجز موعد',
    heroDashBtn: 'اذهب للوحة التحكم',
    heroFreeBtn: 'ابدأ مجاناً',
    heroSignInBtn: 'تسجيل الدخول',
    statSpecialties: 'تخصصات طبية',
    statOnlineBooking: 'حجز عبر الإنترنت',
    statSecure: 'أمان وخصوصية',
    statWaitLine: 'انتظار في الطابور',
    ourSpecialties: 'تخصصاتنا',
    specialtiesDesc: 'رعاية عالمية المستوى في كافة الأقسام — احجز في أي منها في ثوانٍ.',
    heartClinic: 'عيادة القلب',
    heartDesc: 'طب القلب وإدارة أمراض القلب.',
    brainClinic: 'المخ والأعصاب',
    brainDesc: 'التقييم العصبي والرعاية.',
    eyeClinic: 'عيادة العيون',
    eyeDesc: 'فحوصات الرؤية وعلاج العيون.',
    bonesClinic: 'العظام والمفاصل',
    bonesDesc: 'رعاية العظام وعلاج المفاصل.',
    womenClinic: 'صحة المرأة',
    womenDesc: 'أمراض النساء والتوليد والرعاية الخاصة بالمرأة.',
    childrenClinic: 'صحة الأطفال',
    childrenDesc: 'استشارات طب الأطفال لجميع الأعمار.',
    readyToBook: 'جاهز لحجز موعدك؟',
    joinThousands: 'انضم إلى آلاف المرضى الذين يديرون صحتهم مع SynCare.',
    bookNow: 'احجز الآن',
    createFreeAccount: 'إنشاء حساب مجاني',
    footerBuiltWithCare: 'SynCare. مبني بعناية.'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('syncare_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('syncare_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return dictionary[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
