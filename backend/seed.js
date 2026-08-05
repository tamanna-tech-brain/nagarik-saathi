import mongoose from 'mongoose';
import connectDB from './db.js';
import { Scheme } from './models.js';
import dotenv from 'dotenv';
dotenv.config();

const schemesData = [
  {
    schemeId: "pm-kisan",
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    nameHindi: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
    category: ["Agriculture", "Direct Benefit Transfer"],
    targetGroups: ["Farmers", "Rural landowners"],
    eligibility: {
      occupation: ["Farmer", "Agriculture"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 5,
      states: ["All"],
      maxAnnualIncome: 300000
    },
    benefits: "Direct income support of ₹6,000 per year in three equal installments of ₹2,000 each directly into the bank accounts of landholding farmer families.",
    benefitsHindi: "भूमिधारक किसान परिवारों के बैंक खातों में सीधे ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता, ₹2,000 की तीन समान किश्तों में।",
    documents: ["Aadhaar Card", "Land Ownership Certificate/Khasra-Khatauni", "Bank Passbook", "Mobile Number"],
    applicationUrl: "https://pmkisan.gov.in",
    helplineNumber: "155261",
    description: "PM-Kisan is a Central Sector scheme with 100% funding from Government of India. The scheme is effective from 1.12.2018. Under the scheme an income support of Rs. 6000/- per year in three equal installments will be provided to all landholding farmer families.",
    descriptionHindi: "पीएम-किसान भारत सरकार से 100% वित्त पोषण वाली एक केंद्रीय क्षेत्र की योजना है। यह योजना 1.12.2018 से प्रभावी है। इस योजना के तहत सभी भूमिधारक किसान परिवारों को तीन समान किश्तों में प्रति वर्ष 6000 रुपये की आय सहायता प्रदान की जाएगी।",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    lastVerified: new Date("2026-07-15"),
    sourceUrl: "https://www.myscheme.gov.in/schemes/pmkisan"
  },
  {
    schemeId: "pm-ujjwala",
    name: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    nameHindi: "प्रधानमंत्री उज्ज्वला योजना (PMUY)",
    category: ["Social Welfare", "Cooking Gas"],
    targetGroups: ["Women", "BPL Families"],
    eligibility: {
      occupation: ["All"],
      gender: "Female",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 150000
    },
    benefits: "Provides free LPG connection to adult women from poor households, along with a subsidy on the first cylinder and stove.",
    benefitsHindi: "गरीब परिवारों की वयस्क महिलाओं को मुफ्त एलपीजी कनेक्शन प्रदान करता है, साथ ही पहले सिलेंडर और चूल्हे पर सब्सिडी।",
    documents: ["BPL Ration Card", "Aadhaar Card", "Bank Account Details", "Passport Size Photograph"],
    applicationUrl: "https://www.pmuy.gov.in",
    helplineNumber: "1906",
    description: "A scheme of Ministry of Petroleum & Natural Gas for providing LPG connections to women from Below Poverty Line (BPL) households to replace unclean cooking fuels.",
    descriptionHindi: "अस्वच्छ खाना पकाने के ईंधन को बदलने के लिए गरीबी रेखा से नीचे (बीपीएल) परिवारों की महिलाओं को एलपीजी कनेक्शन प्रदान करने के लिए पेट्रोलियम और प्राकृतिक गैस मंत्रालय की एक योजना।",
    ministry: "Ministry of Petroleum and Natural Gas",
    lastVerified: new Date("2026-06-20"),
    sourceUrl: "https://www.pmuy.gov.in/"
  },
  {
    schemeId: "pm-awas-gramin",
    name: "Pradhan Mantri Awas Yojana (Gramin) (PMAY-G)",
    nameHindi: "प्रधानमंत्री आवास योजना (ग्रामीण) (PMAY-G)",
    category: ["Housing", "Rural Infrastructure"],
    targetGroups: ["Homeless", "Rural Poor"],
    eligibility: {
      occupation: ["All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 200000
    },
    benefits: "Financial assistance of ₹1.2 Lakh in plains and ₹1.3 Lakh in hilly/difficult areas for construction of a permanent house, plus ₹12,000 for toilet construction.",
    benefitsHindi: "मैदानी क्षेत्रों में ₹1.2 लाख और पहाड़ी/कठिन क्षेत्रों में ₹1.3 लाख की वित्तीय सहायता स्थायी घर के निर्माण के लिए, साथ ही शौचालय निर्माण के लिए ₹12,000।",
    documents: ["Aadhaar Card", "Ration Card / BPL Certificate", "Bank Account Passbook", "MGNREGA Job Card Number", "Swachh Bharat Mission UID"],
    applicationUrl: "https://pmayg.nic.in",
    helplineNumber: "1800-11-6446",
    description: "Designed to help rural families below poverty line (BPL) construct or upgrade their housing units with a clean cooking space and basic amenities.",
    descriptionHindi: "गरीबी रेखा से नीचे (बीपीएल) के ग्रामीण परिवारों को स्वच्छ रसोई घर और बुनियादी सुविधाओं के साथ अपने आवास इकाइयों के निर्माण या उन्नयन में मदद करने के लिए डिज़ाइन किया गया है।",
    ministry: "Ministry of Rural Development",
    lastVerified: new Date("2026-07-10"),
    sourceUrl: "https://pmayg.nic.in/"
  },
  {
    schemeId: "mgnrega",
    name: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
    nameHindi: "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (MGNREGA)",
    category: ["Employment", "Social Security"],
    targetGroups: ["Rural Households", "Manual Labourers"],
    eligibility: {
      occupation: ["Labourer", "Unskilled Worker", "All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Guarantees 100 days of wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work.",
    benefitsHindi: "प्रत्येक ग्रामीण परिवार को एक वित्तीय वर्ष में 100 दिनों के मजदूरी रोजगार की गारंटी देता है जिसके वयस्क सदस्य अकुशल शारीरिक श्रम करने के लिए तैयार हैं।",
    documents: ["Aadhaar Card", "Age Proof", "Ration Card", "Bank Account Details", "MGNREGA Job Card Application Form"],
    applicationUrl: "https://nrega.nic.in",
    helplineNumber: "1800-111-555",
    description: "A labor law and social security measure that aims to guarantee the right to work in rural areas by improving livelihood security.",
    descriptionHindi: "एक श्रम कानून और सामाजिक सुरक्षा उपाय जिसका उद्देश्य आजीविका सुरक्षा में सुधार करके ग्रामीण क्षेत्रों में काम करने के अधिकार की गारंटी देना है।",
    ministry: "Ministry of Rural Development",
    lastVerified: new Date("2026-07-22"),
    sourceUrl: "https://nrega.nic.in/"
  },
  {
    schemeId: "pm-sym",
    name: "Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)",
    nameHindi: "प्रधानमंत्री श्रम योगी मान-धन (PM-SYM)",
    category: ["Pension", "Social Security"],
    targetGroups: ["Unorganized Sector Workers", "Low Income Earners"],
    eligibility: {
      occupation: ["Labourer", "Domestic Worker", "Street Vendor", "Agriculture", "All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 180000 // Monthly income < 15,000
    },
    benefits: "Assured monthly pension of ₹3,000 after attaining the age of 60 years. If the subscriber dies, the spouse gets 50% as family pension.",
    benefitsHindi: "60 वर्ष की आयु प्राप्त करने के बाद ₹3,000 की सुनिश्चित मासिक पेंशन। यदि ग्राहक की मृत्यु हो जाती है, तो जीवनसाथी को पारिवारिक पेंशन के रूप में 50% मिलता है।",
    documents: ["Aadhaar Card", "Savings Bank Account / Jan Dhan Account with IFSC", "Mobile Number"],
    applicationUrl: "https://maandhan.in",
    helplineNumber: "14434",
    description: "Voluntary and contributory pension scheme for unorganized workers like street vendors, rickshaw pullers, construction workers, rag pickers, etc., aged 18-40 years.",
    descriptionHindi: "18-40 वर्ष की आयु के रेहड़ी-पटरी वालों, रिक्शा चालकों, निर्माण श्रमिकों, कचरा बीनने वालों आदि जैसे असंगठित श्रमिकों के लिए स्वैच्छिक और अंशदायी पेंशन योजना।",
    ministry: "Ministry of Labour and Employment",
    lastVerified: new Date("2026-05-18"),
    sourceUrl: "https://www.maandhan.in/"
  },
  {
    schemeId: "pm-mudra",
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    nameHindi: "प्रधानमंत्री मुद्रा योजना (PMMY)",
    category: ["Business Loans", "Financial Services"],
    targetGroups: ["Micro Entrepreneurs", "Small Business Owners"],
    eligibility: {
      occupation: ["Business Owner", "Artisan", "Shopkeeper", "Self Employed"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Collateral-free business loans up to ₹10 Lakh in three categories: Shishu (up to ₹50,000), Kishor (₹50,000 to ₹5 Lakh), and Tarun (₹5 Lakh to ₹10 Lakh).",
    benefitsHindi: "तीन श्रेणियों में ₹10 लाख तक के संपार्श्विक-मुक्त व्यावसायिक ऋण: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख), और तरुण (₹5 लाख से ₹10 लाख)।",
    documents: ["Aadhaar Card / Voter ID", "Proof of Business Address", "Identity Proof & Address Proof", "Quotation of Machinery / Business Plan", "Photos"],
    applicationUrl: "https://www.mudra.org.in",
    helplineNumber: "1800-180-1111",
    description: "PMMY enables a small borrower to borrow from all Joint Liability Groups (JLGs), Micro Finance Institutions (MFIs), Non-Banking Financial Companies (NBFCs), Commercial Banks, and Regional Rural Banks (RRBs).",
    descriptionHindi: "पीएमएमवाई एक छोटे उधारकर्ता को सभी संयुक्त देयता समूहों (जेएलजी), सूक्ष्म वित्त संस्थानों (एमएफआई), गैर-बैंकिंग वित्तीय कंपनियों (एनबीएफसी), वाणिज्यिक बैंकों और क्षेत्रीय ग्रामीण बैंकों (आरआरबी) से उधार लेने में सक्षम बनाता है।",
    ministry: "Ministry of Finance",
    lastVerified: new Date("2026-06-15"),
    sourceUrl: "https://www.mudra.org.in/"
  },
  {
    schemeId: "atal-pension",
    name: "Atal Pension Yojana (APY)",
    nameHindi: "अटल पेंशन योजना (APY)",
    category: ["Pension", "Social Security"],
    targetGroups: ["All Citizens", "Unorganized Sector"],
    eligibility: {
      occupation: ["All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 after 60 years of age, based on the contribution made between 18 and 40 years of age.",
    benefitsHindi: "18 से 40 वर्ष की आयु के बीच किए गए योगदान के आधार पर, 60 वर्ष की आयु के बाद ₹1,000, ₹2,000, ₹3,000, ₹4,000 या ₹5,000 की गारंटीकृत न्यूनतम मासिक पेंशन।",
    documents: ["Aadhaar Card", "Mobile Number", "Active Savings Bank Account"],
    applicationUrl: "https://www.npscra.nsdl.co.in",
    helplineNumber: "1800-110-069",
    description: "APY is open to all bank account holders. The government co-contributes 50% of the total contribution or ₹1,000 per annum, whichever is lower, to eligible subscribers who joined before 31st December 2015.",
    descriptionHindi: "एपीवाई सभी बैंक खाताधारकों के लिए खुला है। सरकार 31 दिसंबर 2015 से पहले शामिल होने वाले पात्र ग्राहकों को कुल योगदान का 50% या ₹1,000 प्रति वर्ष, जो भी कम हो, का सह-योगदान देती है।",
    ministry: "Ministry of Finance",
    lastVerified: new Date("2026-07-05"),
    sourceUrl: "https://www.npscra.nsdl.co.in"
  },
  {
    schemeId: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    nameHindi: "सुकन्या समृद्धि योजना (SSY)",
    category: ["Women Empowerment", "Savings Schemes"],
    targetGroups: ["Girl Child", "Parents"],
    eligibility: {
      occupation: ["All"],
      gender: "Female", // Specifically for girl children under 10
      maritalStatus: ["Single"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "High-interest savings account for girl children with tax benefits under Section 80C. Currently offers ~8.2% interest rate. Can be opened before the girl child turns 10.",
    benefitsHindi: "धारा 80सी के तहत कर लाभ के साथ बालिकाओं के लिए उच्च ब्याज बचत खाता। वर्तमान में ~8.2% ब्याज दर प्रदान करता है। बालिका के 10 वर्ष की होने से पहले खोला जा सकता है।",
    documents: ["Birth Certificate of Girl Child", "Identity & Address Proof of Parent/Guardian (Aadhaar, PAN)", "Photograph of Child and Parent"],
    applicationUrl: "https://www.indiapost.gov.in",
    helplineNumber: "1800-266-6868",
    description: "A small deposit scheme for the girl child launched as a part of the 'Beti Bachao Beti Padhao' campaign. The account can be opened in Post Offices and authorized banks.",
    descriptionHindi: 'बालिकाओं के लिए एक छोटी जमा योजना जिसे "बेटी बचाओ बेटी पढ़ाओ" अभियान के हिस्से के रूप में शुरू किया गया है। खाता डाकघरों और अधिकृत बैंकों में खोला जा सकता है।',
    ministry: "Ministry of Finance",
    lastVerified: new Date("2026-07-12"),
    sourceUrl: "https://www.myscheme.gov.in/schemes/ssy"
  },
  {
    schemeId: "ayushman-bharat",
    name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
    nameHindi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (AB-PMJAY)",
    category: ["Health Insurance", "Social Security"],
    targetGroups: ["Poor Families", "Rural Population"],
    eligibility: {
      occupation: ["Labourer", "Farmer", "Artisan", "All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 250000
    },
    benefits: "Free health cover of up to ₹5 Lakh per family per year for secondary and tertiary care hospitalization across public and private empaneled hospitals.",
    benefitsHindi: "सार्वजनिक और निजी सूचीबद्ध अस्पतालों में माध्यमिक और तृतीयक देखभाल अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख तक का मुफ्त स्वास्थ्य कवर।",
    documents: ["Aadhaar Card / Voter ID", "Ration Card / PM Letter containing family ID", "Income Certificate"],
    applicationUrl: "https://pmjay.gov.in",
    helplineNumber: "14555",
    description: "PM-JAY is the largest health assurance scheme in the world which aims to provide free health cover to over 12 crore poor and vulnerable families.",
    descriptionHindi: "पीएम-जेएवाई दुनिया की सबसे बड़ी स्वास्थ्य आश्वासन योजना है जिसका उद्देश्य 12 करोड़ से अधिक गरीब और कमजोर परिवारों को मुफ्त स्वास्थ्य कवर प्रदान करना है।",
    ministry: "Ministry of Health and Family Welfare",
    lastVerified: new Date("2026-07-25"),
    sourceUrl: "https://pmjay.gov.in/"
  },
  {
    schemeId: "janani-suraksha",
    name: "Janani Suraksha Yojana (JSY)",
    nameHindi: "जननी सुरक्षा योजना (JSY)",
    category: ["Maternal Health", "Direct Benefit Transfer"],
    targetGroups: ["Pregnant Women", "Rural Mothers"],
    eligibility: {
      occupation: ["All"],
      gender: "Female",
      maritalStatus: ["Married", "Widowed"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 150000
    },
    benefits: "Cash assistance of ₹1,400 to rural pregnant women and ₹700 to urban pregnant women belonging to BPL/SC/ST families who deliver in government institutions.",
    benefitsHindi: "सरकारी संस्थानों में प्रसव कराने वाली बीपीएल/एससी/एसटी परिवारों की ग्रामीण गर्भवती महिलाओं को ₹1,400 और शहरी गर्भवती महिलाओं को ₹700 की नकद सहायता।",
    documents: ["JSY Card / MCH Card", "Aadhaar Card", "BPL Ration Card", "Bank Account Details (Passbook)"],
    applicationUrl: "https://nhm.gov.in",
    helplineNumber: "104",
    description: "A safe motherhood intervention under the National Health Mission (NHM) being implemented with the objective of reducing maternal and neonatal mortality.",
    descriptionHindi: "राष्ट्रीय स्वास्थ्य मिशन (NHM) के तहत एक सुरक्षित मातृत्व हस्तक्षेप जिसे मातृ और नवजात शिशु मृत्यु दर को कम करने के उद्देश्य से लागू किया जा रहा है।",
    ministry: "Ministry of Health and Family Welfare",
    lastVerified: new Date("2026-07-02"),
    sourceUrl: "https://www.myscheme.gov.in/schemes/jsy"
  },
  {
    schemeId: "pm-fasal-bima",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    nameHindi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
    category: ["Agriculture", "Crop Insurance"],
    targetGroups: ["Farmers"],
    eligibility: {
      occupation: ["Farmer", "Agriculture"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Insurance cover against crop failure due to natural calamities, pests, or diseases. Farmers pay a nominal premium: 2% for Kharif, 1.5% for Rabi, and 5% for commercial/horticultural crops.",
    benefitsHindi: "प्राकृतिक आपदाओं, कीटों या बीमारियों के कारण फसल खराब होने के खिलाफ बीमा कवर। किसान एक मामूली प्रीमियम का भुगतान करते हैं: खरीफ के लिए 2%, रबी के लिए 1.5%, और व्यावसायिक/बागवानी फसलों के लिए 5%।",
    documents: ["Land Records (Khasra Number / Patta)", "Sowing Certificate issued by Patwari/Gram Panchayat", "Bank Passbook", "Aadhaar Card"],
    applicationUrl: "https://pmfby.gov.in",
    helplineNumber: "1800-180-1551",
    description: "Formulated in line with One Nation–One Scheme theme, PMFBY replaced the two existing schemes National Agricultural Insurance Scheme (NAIS) & Modified NAIS.",
    descriptionHindi: "एक राष्ट्र-एक योजना विषय के अनुरूप तैयार की गई, पीएमएफबीवाई ने दो मौजूदा योजनाओं राष्ट्रीय कृषि बीमा योजना (एनएआईएस) और संशोधित एनएआईएस को बदल दिया।",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    lastVerified: new Date("2026-07-18"),
    sourceUrl: "https://pmfby.gov.in/"
  },
  {
    schemeId: "pm-jeevan-jyoti",
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    nameHindi: "प्रधानमंत्री जीवन ज्योति बीमा योजना (PMJJBY)",
    category: ["Life Insurance", "Social Security"],
    targetGroups: ["All Adults aged 18-50"],
    eligibility: {
      occupation: ["All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Life insurance cover of ₹2 Lakh in case of death of the insured due to any reason, for an annual premium of ₹436 auto-debited from bank account.",
    benefitsHindi: "किसी भी कारण से बीमित व्यक्ति की मृत्यु के मामले में ₹2 लाख का जीवन बीमा कवर, बैंक खाते से ऑटो-डेबिट होने वाले ₹436 के वार्षिक प्रीमियम पर।",
    documents: ["Aadhaar Card", "Consent Form for Auto-Debit", "Savings Bank Account details"],
    applicationUrl: "https://www.jansuraksha.gov.in",
    helplineNumber: "1800-180-1111",
    description: "A one-year life insurance scheme, renewable from year to year, offering life insurance cover for death due to any reason, open to people in the age group 18 to 50 years.",
    descriptionHindi: "एक वर्षीय जीवन बीमा योजना, साल-दर-साल नवीकरणीय, किसी भी कारण से मृत्यु के लिए जीवन बीमा कवर की पेशकश, 18 से 50 वर्ष की आयु वर्ग के लोगों के लिए खुली।",
    ministry: "Ministry of Finance",
    lastVerified: new Date("2026-05-10"),
    sourceUrl: "https://www.jansuraksha.gov.in"
  },
  {
    schemeId: "pm-suraksha-bima",
    name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    nameHindi: "प्रधानमंत्री सुरक्षा बीमा योजना (PMSBY)",
    category: ["Accident Insurance", "Social Security"],
    targetGroups: ["All Adults aged 18-70"],
    eligibility: {
      occupation: ["All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Accidental death and full disability insurance cover of ₹2 Lakh, and partial disability cover of ₹1 Lakh, at an annual premium of ₹20 auto-debited from bank account.",
    benefitsHindi: "₹20 के वार्षिक प्रीमियम पर ₹2 लाख का दुर्घटना मृत्यु और पूर्ण विकलांगता बीमा कवर, और ₹1 लाख का आंशिक विकलांगता कवर, जो बैंक खाते से ऑटो-डेबिट होता है।",
    documents: ["Aadhaar Card", "Consent Form for Auto-Debit", "Savings Bank Account details"],
    applicationUrl: "https://www.jansuraksha.gov.in",
    helplineNumber: "1800-180-1111",
    description: "An accident insurance scheme offering protection against death or disability due to an accident, open to people in the age group 18 to 70 years.",
    descriptionHindi: "एक दुर्घटना बीमा योजना जो दुर्घटना के कारण मृत्यु या विकलांगता के खिलाफ सुरक्षा प्रदान करती है, 18 से 70 वर्ष की आयु वर्ग के लोगों के लिए खुली है।",
    ministry: "Ministry of Finance",
    lastVerified: new Date("2026-05-10"),
    sourceUrl: "https://www.jansuraksha.gov.in"
  },
  {
    schemeId: "ddu-gky",
    name: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    nameHindi: "दीन दयाल उपाध्याय ग्रामीण कौशल्या योजना (DDU-GKY)",
    category: ["Skill Development", "Employment"],
    targetGroups: ["Rural Youth", "Unemployed Youth"],
    eligibility: {
      occupation: ["Unemployed", "All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 120000
    },
    benefits: "Free placement-linked skill training in various trades (IT, Retail, Hospitality, etc.), along with free uniforms, books, and post-placement support.",
    benefitsHindi: "विभिन्न ट्रेडों (आईटी, रिटेल, हॉस्पिटैलिटी आदि) में मुफ्त प्लेसमेंट-लिंक्ड कौशल प्रशिक्षण, साथ ही मुफ्त वर्दी, किताबें और प्लेसमेंट के बाद सहायता।",
    documents: ["Aadhaar Card", "Age Proof (School Certificate)", "BPL Card / Income Certificate", "Caste Certificate (SC/ST, if applicable)", "Bank Account Details"],
    applicationUrl: "http://ddugky.gov.in",
    helplineNumber: "1800-120-4090",
    description: "A rural youth employment promotion initiative targeting poor rural youth between the ages of 15 and 35, to enable them to access salaried employment.",
    descriptionHindi: "15 से 35 वर्ष की आयु के गरीब ग्रामीण युवाओं को लक्षित करने वाली एक ग्रामीण युवा रोजगार प्रोत्साहन पहल, ताकि उन्हें वेतनभोगी रोजगार तक पहुंचने में सक्षम बनाया जा सके।",
    ministry: "Ministry of Rural Development",
    lastVerified: new Date("2026-06-25"),
    sourceUrl: "http://ddugky.gov.in/"
  },
  {
    schemeId: "pm-vishwakarma",
    name: "PM Vishwakarma Scheme",
    nameHindi: "पीएम विश्वकर्मा योजना",
    category: ["Skill Development", "Financial Support"],
    targetGroups: ["Artisans", "Traditional Craftsmen"],
    eligibility: {
      occupation: ["Artisan", "Carpenter", "Blacksmith", "Potter", "Weaver", "Tailor", "Cobbler", "Barber"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 200000
    },
    benefits: "Recognition via PM Vishwakarma Certificate & ID, skill upgradation training with stipend of ₹500/day, toolkit incentive of ₹15,000, and collateral-free credit support up to ₹3 Lakh at concessional 5% interest rate.",
    benefitsHindi: "पीएम विश्वकर्मा प्रमाणपत्र और आईडी के माध्यम से मान्यता, ₹500/दिन के वजीफे के साथ कौशल उन्नयन प्रशिक्षण, ₹15,000 का टूलकिट प्रोत्साहन, और रियायती 5% ब्याज दर पर ₹3 लाख तक का संपार्श्विक-मुक्त क्रेडिट समर्थन।",
    documents: ["Aadhaar Card", "Mobile Number linked with Aadhaar", "Bank Account Details", "Ration Card", "Proof of Trade/Occupation"],
    applicationUrl: "https://pmvishwakarma.gov.in",
    helplineNumber: "1800-267-7777",
    description: "A Central Sector Scheme supporting traditional artisans and craftspeople who work with their hands and tools. Covers 18 traditional trades.",
    descriptionHindi: "हाथों और औजारों से काम करने वाले पारंपरिक कारीगरों और शिल्पकारों को सहायता प्रदान करने वाली एक केंद्रीय क्षेत्र की योजना। इसमें 18 पारंपरिक ट्रेड शामिल हैं।",
    ministry: "Ministry of Micro, Small and Medium Enterprises",
    lastVerified: new Date("2026-07-20"),
    sourceUrl: "https://pmvishwakarma.gov.in"
  },
  {
    schemeId: "pm-svanidhi",
    name: "PM Street Vendor's AtmaNirbhar Nidhi (PM-SVANidhi)",
    nameHindi: "पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (PM-SVANidhi)",
    category: ["Micro Loans", "Financial Support"],
    targetGroups: ["Street Vendors", "Urban & Rural Hawkers"],
    eligibility: {
      occupation: ["Street Vendor", "Shopkeeper", "Self Employed"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Collateral-free working capital loan of up to ₹10,000 for 1-year tenure. Upon timely repayment, eligible for ₹20,000 loan in 2nd tranche, and ₹50,000 loan in 3rd tranche. Interest subsidy of 7% per annum.",
    benefitsHindi: "1 वर्ष की अवधि के लिए ₹10,000 तक का संपार्श्विक-मुक्त कार्यशील पूंजी ऋण। समय पर पुनर्भुगतान करने पर, दूसरी किश्त में ₹20,000 के ऋण और तीसरी किश्त में ₹50,000 के ऋण के लिए पात्र। प्रति वर्ष 7% की ब्याज सब्सिडी।",
    documents: ["Aadhaar Card", "Voter Identity Card", "Certificate of Vending / Letter of Recommendation from ULB", "Bank Passbook"],
    applicationUrl: "https://pmsvanidhi.mohua.gov.in",
    helplineNumber: "1800-11-1979",
    description: "A special micro-credit facility scheme for providing affordable working capital loans to street vendors to resume their livelihoods.",
    descriptionHindi: "स्ट्रीट वेंडरों को अपनी आजीविका फिर से शुरू करने के लिए किफायती कार्यशील पूंजी ऋण प्रदान करने के लिए एक विशेष सूक्ष्म-ऋण सुविधा योजना।",
    ministry: "Ministry of Housing and Urban Affairs",
    lastVerified: new Date("2026-07-08"),
    sourceUrl: "https://pmsvanidhi.mohua.gov.in/"
  },
  {
    schemeId: "lakhpati-didi",
    name: "Lakhpati Didi Scheme",
    nameHindi: "लखपति दीदी योजना",
    category: ["Women Empowerment", "Livelihood Support"],
    targetGroups: ["Self Help Group (SHG) Women", "Rural Women"],
    eligibility: {
      occupation: ["Self Help Group Member", "Farmer", "Artisan", "All"],
      gender: "Female",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 100000
    },
    benefits: "Empowers women members of Self-Help Groups to earn a sustainable income of at least ₹1 Lakh per year. Provides skill training (LED bulb making, plumbing, drone piloting, agriculture) and financial assistance.",
    benefitsHindi: "स्वयं सहायता समूहों की महिला सदस्यों को प्रति वर्ष कम से कम ₹1 लाख की स्थायी आय अर्जित करने के लिए सशक्त बनाता है। कौशल प्रशिक्षण (एलईडी बल्ब बनाना, प्लंबिंग, ड्रोन पायलट, कृषि) और वित्तीय सहायता प्रदान करता है।",
    documents: ["Aadhaar Card", "SHG Registration Certificate / Proof of Membership", "Ration Card", "Bank Passbook", "Income Certificate"],
    applicationUrl: "https://rural.gov.in",
    helplineNumber: "011-23381352",
    description: "National initiative to skill rural women and make them economically independent self-help group members earning over 1 lakh annually.",
    descriptionHindi: "ग्रामीण महिलाओं को कुशल बनाने और उन्हें आर्थिक रूप से स्वतंत्र स्वयं सहायता समूह का सदस्य बनाने की राष्ट्रीय पहल, जो सालाना 1 लाख से अधिक कमाती हैं।",
    ministry: "Ministry of Rural Development",
    lastVerified: new Date("2026-07-28"),
    sourceUrl: "https://www.myscheme.gov.in/schemes/lakhpatididi"
  },
  {
    schemeId: "pm-pranam",
    name: "PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth (PM-PRANAM)",
    nameHindi: "पीएम-प्रणाम योजना",
    category: ["Agriculture", "Environmental Welfare"],
    targetGroups: ["Farmers", "Panchayats"],
    eligibility: {
      occupation: ["Farmer", "Agriculture"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Promotes balanced use of chemical fertilizers along with alternative fertilizers (organic, bio-fertilizers). State governments get financial incentives for reducing chemical fertilizer consumption.",
    benefitsHindi: "वैकल्पिक उर्वरकों (जैविक, जैव-उर्वरक) के साथ रासायनिक उर्वरकों के संतुलित उपयोग को बढ़ावा देता है। रासायनिक उर्वरक की खपत कम करने के लिए राज्य सरकारों को वित्तीय प्रोत्साहन मिलता है।",
    documents: ["Land Ownership details", "Aadhaar Card", "Bank Account Details"],
    applicationUrl: "https://www.fert.nic.in",
    helplineNumber: "011-23385365",
    description: "Launched to encourage states to promote alternative fertilizers and reduce chemical fertilizer use in agriculture, helping reclaim land quality.",
    descriptionHindi: "राज्यों को वैकल्पिक उर्वरकों को बढ़ावा देने और कृषि में रासायनिक उर्वरकों के उपयोग को कम करने के लिए प्रोत्साहित करने के लिए शुरू किया गया, जिससे भूमि की गुणवत्ता को पुनः प्राप्त करने में मदद मिलेगी।",
    ministry: "Ministry of Chemicals and Fertilizers",
    lastVerified: new Date("2026-04-12"),
    sourceUrl: "https://www.myscheme.gov.in/schemes/pmpranam"
  },
  {
    schemeId: "central-scholarship",
    name: "Central Sector Scheme of Scholarship for College and University Students",
    nameHindi: "कॉलेज और विश्वविद्यालय के छात्रों के लिए छात्रवृत्ति की केंद्रीय क्षेत्र की योजना",
    category: ["Education", "Scholarships"],
    targetGroups: ["Students", "Youth"],
    eligibility: {
      occupation: ["Student"],
      gender: "All",
      maritalStatus: ["Single"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 450000
    },
    benefits: "Scholarship of ₹12,000 per annum for graduation (first 3 years) and ₹20,000 per annum for post-graduation to meritorious students belonging to families with income below 4.5L.",
    benefitsHindi: "4.5 लाख से कम आय वाले परिवारों के मेधावी छात्रों को स्नातक (पहले 3 वर्ष) के लिए ₹12,000 प्रति वर्ष और स्नातकोत्तर के लिए ₹20,000 प्रति वर्ष की छात्रवृत्ति।",
    documents: ["Aadhaar Card", "Mark Sheet of Class 12th (above 80th percentile)", "Annual Income Certificate", "Fee Receipt / College Admission Letter", "Bank Passbook"],
    applicationUrl: "https://scholarships.gov.in",
    helplineNumber: "0120-6619540",
    description: "To provide financial assistance to meritorious students from poor families, to meet a part of their day-to-day expenses while pursuing higher studies.",
    descriptionHindi: "गरीब परिवारों के मेधावी छात्रों को उच्च शिक्षा प्राप्त करने के दौरान उनके दैनिक खर्चों के एक हिस्से को पूरा करने के लिए वित्तीय सहायता प्रदान करना।",
    ministry: "Ministry of Education",
    lastVerified: new Date("2026-07-01"),
    sourceUrl: "https://scholarships.gov.in"
  },
  {
    schemeId: "pm-matru-vandana",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    nameHindi: "प्रधानमंत्री मातृ वंदना योजना (PMMVY)",
    category: ["Maternal Health", "Direct Benefit Transfer"],
    targetGroups: ["Pregnant Women", "Lactating Mothers"],
    eligibility: {
      occupation: ["All"],
      gender: "Female",
      maritalStatus: ["Married", "Widowed"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 800000
    },
    benefits: "Direct cash incentive of ₹5,000 in two installments for the first child and ₹6,000 for the second child (if girl child), directly into the beneficiary's bank account.",
    benefitsHindi: "पहले बच्चे के लिए दो किश्तों में ₹5,000 और दूसरे बच्चे के लिए ₹6,000 (यदि बालिका हो) का प्रत्यक्ष नकद प्रोत्साहन, सीधे लाभार्थी के बैंक खाते में।",
    documents: ["Aadhaar Card of Mother & Husband", "Mother & Child Protection (MCP) Card", "Identity Proof", "Bank Passbook", "Birth Certificate of Child"],
    applicationUrl: "https://wcd.nic.in",
    helplineNumber: "1098",
    description: "Maternity benefit program running in all districts of India. Provides partial compensation for the wage loss in terms of cash incentives.",
    descriptionHindi: "भारत के सभी जिलों में चल रहा मातृत्व लाभ कार्यक्रम। नकद प्रोत्साहन के रूप में मजदूरी के नुकसान के लिए आंशिक मुआवजा प्रदान करता है।",
    ministry: "Ministry of Women and Child Development",
    lastVerified: new Date("2026-07-14"),
    sourceUrl: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana"
  },
  {
    schemeId: "ign-old-age-pension",
    name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    nameHindi: "इंद्रा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (IGNOAPS)",
    category: ["Pension", "Social Security"],
    targetGroups: ["Elderly Citizens", "Senior Citizens"],
    eligibility: {
      occupation: ["All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 120000 // Specifically BPL
    },
    benefits: "Monthly pension of ₹200 for citizens aged 60-79 years, and ₹500 per month for citizens aged 80 years and above. States often add supplementary amounts.",
    benefitsHindi: "60-79 वर्ष की आयु के नागरिकों के लिए ₹200 मासिक पेंशन, और 80 वर्ष और उससे अधिक आयु के नागरिकों के लिए ₹500 प्रति माह। राज्य अक्सर पूरक राशि जोड़ते हैं।",
    documents: ["Aadhaar Card", "Age Proof (Birth Certificate/School Certificate)", "BPL Ration Card / BPL Certificate", "Bank Account Details"],
    applicationUrl: "https://nsap.nic.in",
    helplineNumber: "1800-111-555",
    description: "Under National Social Assistance Programme (NSAP), this scheme provides monthly pension benefits to BPL senior citizens.",
    descriptionHindi: "राष्ट्रीय सामाजिक सहायता कार्यक्रम (NSAP) के तहत, यह योजना बीपीएल वरिष्ठ नागरिकों को मासिक पेंशन लाभ प्रदान करती है।",
    ministry: "Ministry of Rural Development",
    lastVerified: new Date("2026-06-30"),
    sourceUrl: "https://nsap.nic.in/"
  },
  {
    schemeId: "ign-widow-pension",
    name: "Indira Gandhi National Widow Pension Scheme (IGNWPS)",
    nameHindi: "इंद्रा गांधी राष्ट्रीय विधवा पेंशन योजना (IGNWPS)",
    category: ["Pension", "Social Security"],
    targetGroups: ["Widows", "BPL Women"],
    eligibility: {
      occupation: ["All"],
      gender: "Female",
      maritalStatus: ["Widowed"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 120000 // BPL
    },
    benefits: "Monthly pension of ₹300 for widows aged 40-79 years, and ₹500 per month for widows aged 80 years and above. State governments co-contribute additionally.",
    benefitsHindi: "40-79 वर्ष की आयु की विधवाओं के लिए ₹300 मासिक पेंशन, और 80 वर्ष और उससे अधिक आयु की विधवाओं के लिए ₹500 प्रति माह। राज्य सरकारें अतिरिक्त सह-योगदान देती हैं।",
    documents: ["Aadhaar Card", "Husband's Death Certificate", "BPL Certificate / Ration Card", "Bank Account Details", "Age Proof"],
    applicationUrl: "https://nsap.nic.in",
    helplineNumber: "1800-111-555",
    description: "Provides financial safety net to widows living below the poverty line in rural or urban areas under the NSAP structure.",
    descriptionHindi: "एनएसएपी संरचना के तहत ग्रामीण या शहरी क्षेत्रों में गरीबी रेखा से नीचे रहने वाली विधवाओं को वित्तीय सुरक्षा प्रदान करता है।",
    ministry: "Ministry of Rural Development",
    lastVerified: new Date("2026-06-30"),
    sourceUrl: "https://nsap.nic.in/"
  },
  {
    schemeId: "ign-disability-pension",
    name: "Indira Gandhi National Disability Pension Scheme (IGNDPS)",
    nameHindi: "इंद्रा गांधी राष्ट्रीय विकलांगता पेंशन योजना (IGNDPS)",
    category: ["Pension", "Social Security"],
    targetGroups: ["Disabled Citizens"],
    eligibility: {
      occupation: ["All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 120000
    },
    benefits: "Monthly pension of ₹300 for BPL persons aged 18-79 years with severe or multiple disabilities (80% disability or more). Rises to ₹500/month after 80 years.",
    benefitsHindi: "गंभीर या बहु-विकलांगता (80% या अधिक विकलांगता) वाले 18-79 वर्ष की आयु के बीपीएल व्यक्तियों के लिए ₹300 मासिक पेंशन। 80 वर्ष के बाद बढ़कर ₹500/माह हो जाती है।",
    documents: ["Aadhaar Card", "Disability Certificate (minimum 80% disability)", "BPL Certificate", "Bank Passbook", "Age Proof"],
    applicationUrl: "https://nsap.nic.in",
    helplineNumber: "1800-111-555",
    description: "Under NSAP, IGNDPS provides pension to citizens who are severely disabled and belong to below poverty line households.",
    descriptionHindi: "एनएसएपी के तहत, आईजीएनडीपीएस उन नागरिकों को पेंशन प्रदान करता है जो गंभीर रूप से अक्षम हैं और गरीबी रेखा से नीचे के परिवारों से संबंधित हैं।",
    ministry: "Ministry of Rural Development",
    lastVerified: new Date("2026-06-30"),
    sourceUrl: "https://nsap.nic.in/"
  },
  {
    schemeId: "mahila-samman-saving",
    name: "Mahila Samman Saving Certificate",
    nameHindi: "महिला सम्मान बचत प्रमाणपत्र",
    category: ["Savings Schemes", "Women Empowerment"],
    targetGroups: ["Women", "Girls"],
    eligibility: {
      occupation: ["All"],
      gender: "Female",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Small savings scheme offering fixed interest of 7.5% per annum compounded quarterly. Minimum deposit ₹1,000, maximum ₹2 Lakh for a 2-year tenure.",
    benefitsHindi: "त्रैमासिक चक्र में 7.5% प्रति वर्ष का निश्चित ब्याज देने वाली लघु बचत योजना। न्यूनतम जमा ₹1,000, अधिकतम ₹2 लाख 2 वर्ष की अवधि के लिए।",
    documents: ["Aadhaar Card", "PAN Card", "KYC Details", "Application Form", "Cheque or Pay-in Slip"],
    applicationUrl: "https://www.indiapost.gov.in",
    helplineNumber: "1800-266-6868",
    description: "A one-time small savings scheme for women and girls available for a two-year period up to March 2025, offering attractive yield and security.",
    descriptionHindi: "महिलाओं और लड़कियों के लिए एक बार की लघु बचत योजना जो मार्च 2025 तक दो साल की अवधि के लिए उपलब्ध है, जो आकर्षक रिटर्न और सुरक्षा प्रदान करती है।",
    ministry: "Ministry of Finance",
    lastVerified: new Date("2026-04-20"),
    sourceUrl: "https://www.myscheme.gov.in/schemes/mssc"
  },
  {
    schemeId: "stand-up-india",
    name: "Stand-Up India Scheme",
    nameHindi: "स्टैंड-अप इंडिया योजना",
    category: ["Business Loans", "Financial Services"],
    targetGroups: ["SC/ST Entrepreneurs", "Women Entrepreneurs"],
    eligibility: {
      occupation: ["Business Owner", "Self Employed"],
      gender: "All", // Men eligible only if SC/ST, all women eligible
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Bank loans between ₹10 Lakh and ₹1 Crore for setting up a greenfield enterprise in manufacturing, services, agri-allied, or trading sector.",
    benefitsHindi: "विनिर्माण, सेवा, कृषि-संबद्ध, या व्यापार क्षेत्र में एक नई (ग्रीनफील्ड) परियोजना स्थापित करने के लिए ₹10 लाख से ₹1 करोड़ के बीच बैंक ऋण।",
    documents: ["Aadhaar Card / PAN Card", "Caste Certificate (if SC/ST)", "Project Report / Business Plan", "Company Registration Documents", "Bank statements"],
    applicationUrl: "https://www.standupmitra.in",
    helplineNumber: "1800-180-1111",
    description: "Promotes entrepreneurship at the grassroots level, specifically targeting underrepresented sections (SC, ST, and Women).",
    descriptionHindi: "जमीनी स्तर पर उद्यमिता को बढ़ावा देता है, विशेष रूप से वंचित वर्गों (एससी, एसटी और महिलाओं) को लक्षित करता है।",
    ministry: "Ministry of Finance",
    lastVerified: new Date("2026-05-22"),
    sourceUrl: "https://www.standupmitra.in"
  },
  {
    schemeId: "pm-kaushal-vikas",
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    nameHindi: "प्रधानमंत्री कौशल विकास योजना (PMKVY)",
    category: ["Skill Development", "Employment"],
    targetGroups: ["Unemployed Youth", "School dropouts"],
    eligibility: {
      occupation: ["Unemployed", "Student", "All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Free skill training, certification recognized across India, cash rewards upon completion, and support for placement or self-employment opportunities.",
    benefitsHindi: "निःशुल्क कौशल प्रशिक्षण, पूरे भारत में मान्यता प्राप्त प्रमाणन, पूर्ण होने पर नकद पुरस्कार, और प्लेसमेंट या स्व-रोजगार के अवसरों के लिए सहायता।",
    documents: ["Aadhaar Card", "Educational Qualification Marksheets", "Bank Account Details", "Passport Size Photograph"],
    applicationUrl: "https://www.pmkvyofficial.org",
    helplineNumber: "088000-55555",
    description: "The flagship scheme of the Ministry of Skill Development & Entrepreneurship (MSDE) implemented by National Skill Development Corporation (NSDC).",
    descriptionHindi: "कौशल विकास और उद्यमिता मंत्रालय (MSDE) की प्रमुख योजना जिसे राष्ट्रीय कौशल विकास निगम (NSDC) द्वारा कार्यान्वित किया गया है।",
    ministry: "Ministry of Skill Development and Entrepreneurship",
    lastVerified: new Date("2026-07-09"),
    sourceUrl: "https://www.pmkvyofficial.org"
  },
  {
    schemeId: "post-matric-sc",
    name: "Post Matric Scholarship for SC Students",
    nameHindi: "अनुसूचित जाति के छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति",
    category: ["Education", "Scholarships"],
    targetGroups: ["SC Students", "Youth"],
    eligibility: {
      occupation: ["Student"],
      gender: "All",
      maritalStatus: ["Single"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 250000
    },
    benefits: "Covers 100% of non-refundable fees (including tuition fees) and academic allowance up to ₹13,500/year to SC students pursuing post-matric courses.",
    benefitsHindi: "पोस्ट-मैट्रिक पाठ्यक्रम करने वाले अनुसूचित जाति के छात्रों को 100% गैर-वापसी योग्य शुल्क (शिक्षण शुल्क सहित) और ₹13,500/वर्ष तक शैक्षणिक भत्ता प्रदान करता है।",
    documents: ["Caste Certificate (SC)", "Income Certificate (below 2.5L)", "Aadhaar Card", "Previous Class Marksheet", "Bank Passbook", "Fee Receipt of current year"],
    applicationUrl: "https://scholarships.gov.in",
    helplineNumber: "1800-11-2001",
    description: "Centrally sponsored scheme which aims to financially assist Scheduled Caste students studying at post-matriculation or post-secondary stages.",
    descriptionHindi: "केंद्र प्रायोजित योजना जिसका उद्देश्य पोस्ट-मैट्रिक या पोस्ट-सेकेंडरी स्तरों पर पढ़ने वाले अनुसूचित जाति के छात्रों को वित्तीय सहायता प्रदान करना है।",
    ministry: "Ministry of Social Justice and Empowerment",
    lastVerified: new Date("2026-07-11"),
    sourceUrl: "https://scholarships.gov.in"
  },
  {
    schemeId: "pre-matric-sc",
    name: "Pre Matric Scholarship for SC Students",
    nameHindi: "अनुसूचित जाति के छात्रों के लिए प्री मैट्रिक छात्रवृत्ति",
    category: ["Education", "Scholarships"],
    targetGroups: ["SC Students", "Children"],
    eligibility: {
      occupation: ["Student"],
      gender: "All",
      maritalStatus: ["Single"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 250000
    },
    benefits: "Financial aid including basic academic allowance and hostel fee support for SC students studying in classes 9th and 10th.",
    benefitsHindi: "कक्षा 9वीं और 10वीं में पढ़ने वाले अनुसूचित जाति के छात्रों के लिए बुनियादी शैक्षणिक भत्ता और छात्रावास शुल्क सहायता सहित वित्तीय सहायता।",
    documents: ["Caste Certificate", "Income Certificate (below 2.5L)", "Aadhaar Card", "Bank Account Details of Child/Parent", "Previous Class Report Card"],
    applicationUrl: "https://scholarships.gov.in",
    helplineNumber: "1800-11-2001",
    description: "Aims to support parents of SC children for education of their wards studying in classes 9th and 10th so that the dropout rate is minimized.",
    descriptionHindi: "इसका उद्देश्य कक्षा 9वीं और 10वीं में पढ़ने वाले अपने बच्चों की शिक्षा के लिए अनुसूचित जाति के बच्चों के माता-पिता का समर्थन करना है ताकि स्कूल छोड़ने की दर कम से कम हो।",
    ministry: "Ministry of Social Justice and Empowerment",
    lastVerified: new Date("2026-07-11"),
    sourceUrl: "https://scholarships.gov.in"
  },
  {
    schemeId: "means-cum-merit",
    name: "National Means cum Merit Scholarship Scheme",
    nameHindi: "राष्ट्रीय साधन सह योग्यता छात्रवृत्ति योजना",
    category: ["Education", "Scholarships"],
    targetGroups: ["Students", "Rural Children"],
    eligibility: {
      occupation: ["Student"],
      gender: "All",
      maritalStatus: ["Single"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 350000
    },
    benefits: "Scholarship of ₹12,000 per annum (₹1,000 per month) for students of class 9th to 12th to prevent them from dropping out after class 8th.",
    benefitsHindi: "कक्षा 9वीं से 12वीं के छात्रों के लिए ₹12,000 प्रति वर्ष (₹1,000 प्रति माह) की छात्रवृत्ति ताकि उन्हें कक्षा 8वीं के बाद पढ़ाई छोड़ने से रोका जा सके।",
    documents: ["Class 8th Marksheet (min 55% marks)", "Income Certificate (below 3.5L)", "Aadhaar Card", "Caste Certificate (if applicable)", "Bank Account Details"],
    applicationUrl: "https://scholarships.gov.in",
    helplineNumber: "0120-6619540",
    description: "Awarded to meritorious students of economically weaker sections to arrest their drop out at class VIII and encourage them to continue education.",
    descriptionHindi: "आर्थिक रूप से कमजोर वर्गों के मेधावी छात्रों को कक्षा आठवीं में पढ़ाई छोड़ने से रोकने और उन्हें शिक्षा जारी रखने के लिए प्रोत्साहित करने के लिए प्रदान किया जाता है।",
    ministry: "Ministry of Education",
    lastVerified: new Date("2026-06-18"),
    sourceUrl: "https://scholarships.gov.in"
  },
  {
    schemeId: "pm-poshan",
    name: "PM Poshan Shakti Nirman (Mid-Day Meal)",
    nameHindi: "पीएम पोषण शक्ति निर्माण (मध्याह्न भोजन)",
    category: ["Nutrition", "Education Support"],
    targetGroups: ["School Children"],
    eligibility: {
      occupation: ["Student"],
      gender: "All",
      maritalStatus: ["Single"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "Provides one hot cooked meal everyday to children in Government and Government-aided schools studying in classes 1st to 8th.",
    benefitsHindi: "कक्षा 1 से 8वीं में पढ़ने वाले सरकारी और सरकारी सहायता प्राप्त स्कूलों के बच्चों को हर दिन एक गर्म पका हुआ भोजन प्रदान करता है।",
    documents: ["School Enrollment Record / Student Register ID"],
    applicationUrl: "https://pmposhan.education.gov.in",
    helplineNumber: "1800-11-0033",
    description: "Aims to improve the nutritional status of school-age children nationwide and increase school enrollment, retention, and attendance.",
    descriptionHindi: "इसका उद्देश्य देश भर में स्कूल जाने वाले बच्चों के पोषण स्तर में सुधार करना और स्कूल नामांकन, प्रतिधारण और उपस्थिति को बढ़ाना है।",
    ministry: "Ministry of Education",
    lastVerified: new Date("2026-07-04"),
    sourceUrl: "https://pmposhan.education.gov.in"
  },
  {
    schemeId: "mp-kisan-kalyan",
    name: "Mukhyamantri Kisan Kalyan Yojana (Madhya Pradesh)",
    nameHindi: "मुख्यमंत्री किसान कल्याण योजना (मध्य प्रदेश)",
    category: ["Agriculture", "State Scheme"],
    targetGroups: ["Madhya Pradesh Farmers"],
    eligibility: {
      occupation: ["Farmer", "Agriculture"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 5,
      states: ["Madhya Pradesh"],
      maxAnnualIncome: 300000
    },
    benefits: "Additional cash support of ₹4,000 (paid in two installments of ₹2,000 each) per year to the farmers of Madhya Pradesh who are already beneficiaries of PM-KISAN.",
    benefitsHindi: "मध्य प्रदेश के किसानों को, जो पहले से ही पीएम-किसान के लाभार्थी हैं, प्रति वर्ष ₹4,000 (₹2,000 की दो किश्तों में भुगतान) का अतिरिक्त नकद समर्थन।",
    documents: ["PM-KISAN Registration ID", "Land Record (Patta/Khasra)", "Aadhaar Card", "M.P. Samagra ID", "Bank Account Details"],
    applicationUrl: "https://saara.mp.gov.in",
    helplineNumber: "181",
    description: "A state-level top-up scheme to PM-KISAN, initiated by the Madhya Pradesh government to further boost farmer incomes.",
    descriptionHindi: "मध्य प्रदेश सरकार द्वारा किसानों की आय को और बढ़ाने के लिए शुरू की गई पीएम-किसान के लिए एक राज्य-स्तरीय टॉप-अप योजना।",
    ministry: "Revenue Department, Madhya Pradesh",
    lastVerified: new Date("2026-07-16"),
    sourceUrl: "https://saara.mp.gov.in"
  },
  {
    schemeId: "rythu-bandhu",
    name: "Rythu Bandhu (Telangana)",
    nameHindi: "रायथु बंधु योजना (तेलंगाना)",
    category: ["Agriculture", "State Scheme"],
    targetGroups: ["Telangana Farmers"],
    eligibility: {
      occupation: ["Farmer", "Agriculture"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["Telangana"],
      maxAnnualIncome: 9999999
    },
    benefits: "Investment support of ₹10,000 per acre per year for agriculture and horticulture crops, split into two seasons (Kharif and Rabi).",
    benefitsHindi: "कृषि और बागवानी फसलों के लिए ₹10,000 प्रति एकड़ प्रति वर्ष का निवेश सहायता, दो मौसमों (खरीफ और रबी) में विभाजित।",
    documents: ["Pattadar Passbook", "Aadhaar Card", "Bank Passbook Details"],
    applicationUrl: "http://rythubandhu.telangana.gov.in",
    helplineNumber: "040-2338 3520",
    description: "An investment support scheme for agriculture and horticulture crops in Telangana, helping farmers buy seeds, fertilizers, and pesticide inputs.",
    descriptionHindi: "तेलंगाना में कृषि और बागवानी फसलों के लिए एक निवेश सहायता योजना, जिससे किसानों को बीज, उर्वरक और कीटनाशक खरीदने में मदद मिलती है।",
    ministry: "Department of Agriculture, Telangana",
    lastVerified: new Date("2026-05-30"),
    sourceUrl: "http://rythubandhu.telangana.gov.in"
  },
  {
    schemeId: "kalia-odisha",
    name: "Krushak Assistance for Livelihood and Income Augmentation (KALIA - Odisha)",
    nameHindi: "कालिया योजना (ओडिशा)",
    category: ["Agriculture", "State Scheme"],
    targetGroups: ["Odisha Farmers", "Landless Agricultural Labourers"],
    eligibility: {
      occupation: ["Farmer", "Labourer", "Agriculture"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 5,
      states: ["Odisha"],
      maxAnnualIncome: 200000
    },
    benefits: "Financial assistance of ₹25,000 over five seasons for small and marginal farmers, and ₹12,500 for landless agricultural households for allied activities.",
    benefitsHindi: "छोटे और सीमांत किसानों के लिए पांच मौसमों में ₹25,000 की वित्तीय सहायता, और संबद्ध गतिविधियों के लिए भूमिहीन कृषि परिवारों के लिए ₹12,500।",
    documents: ["Aadhaar Card", "Pattadar Land Record", "Bank Passbook", "Ration Card", "Residence Proof"],
    applicationUrl: "https://kalia.odisha.gov.in",
    helplineNumber: "1800-572-1122",
    description: "KALIA scheme aims to provide support to small & marginal farmers, landless agricultural laborers, and vulnerable agricultural households across Odisha.",
    descriptionHindi: "कालिया योजना का उद्देश्य पूरे ओडिशा में छोटे और सीमांत किसानों, भूमिहीन कृषि श्रमिकों और कमजोर कृषि परिवारों को सहायता प्रदान करना है।",
    ministry: "Department of Agriculture and Farmers' Empowerment, Odisha",
    lastVerified: new Date("2026-07-21"),
    sourceUrl: "https://kalia.odisha.gov.in"
  },
  {
    schemeId: "ysr-rythu-bharosa",
    name: "YSR Rythu Bharosa (Andhra Pradesh)",
    nameHindi: "वाईएसआर रायथु भरोसा (आंध्र प्रदेश)",
    category: ["Agriculture", "State Scheme"],
    targetGroups: ["Andhra Pradesh Farmers"],
    eligibility: {
      occupation: ["Farmer", "Agriculture"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["Andhra Pradesh"],
      maxAnnualIncome: 9999999
    },
    benefits: "Financial assistance of ₹13,500 per year (including PM-KISAN contribution of ₹6,000) for tenant and landowner farmer families in Andhra Pradesh.",
    benefitsHindi: "आंध्र प्रदेश में पट्टेदार और भूमिधारक किसान परिवारों के लिए प्रति वर्ष ₹13,500 (पीएम-किसान के ₹6,000 के योगदान सहित) की वित्तीय सहायता।",
    documents: ["Land Possession Document (Adangal/ROR)", "Aadhaar Card", "Bank Passbook details", "Tenant Farmer Agreement (if tenant)"],
    applicationUrl: "https://ysrrythubharosa.ap.gov.in",
    helplineNumber: "155251",
    description: "One of the nine welfare schemes (Navaratnalu) of the Andhra Pradesh government, designed to aid farmers with investment support.",
    descriptionHindi: "आंध्र प्रदेश सरकार की नौ कल्याणकारी योजनाओं (नवरत्नालु) में से एक, जिसे निवेश सहायता के साथ किसानों की सहायता के लिए डिज़ाइन किया गया है।",
    ministry: "Department of Agriculture, Andhra Pradesh",
    lastVerified: new Date("2026-06-25"),
    sourceUrl: "https://ysrrythubharosa.ap.gov.in"
  },
  {
    schemeId: "national-family-benefit",
    name: "National Family Benefit Scheme (NFBS)",
    nameHindi: "राष्ट्रीय परिवार लाभ योजना",
    category: ["Social Security", "Financial Support"],
    targetGroups: ["BPL Families", "Bereaved Families"],
    eligibility: {
      occupation: ["All"],
      gender: "All",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 120000
    },
    benefits: "One-time lump sum cash assistance of ₹20,000 to the bereaved household upon the death of the primary breadwinner (aged 18-59 years) of a BPL family.",
    benefitsHindi: "बीपीएल परिवार के प्राथमिक कमाने वाले (आयु 18-59 वर्ष) की मृत्यु पर शोक संतप्त परिवार को ₹20,000 की एकमुश्त वित्तीय सहायता।",
    documents: ["Death Certificate of Breadwinner", "Aadhaar Card of Applicant", "BPL Certificate / Ration Card", "Bank Account Details", "Age Proof of Deceased"],
    applicationUrl: "https://nsap.nic.in",
    helplineNumber: "1800-111-555",
    description: "NFBS is a sub-scheme of the National Social Assistance Programme, providing financial support to families suffering the loss of their breadwinner.",
    descriptionHindi: "एनएफबीएस राष्ट्रीय सामाजिक सहायता कार्यक्रम की एक उप-योजना है, जो कमाने वाले को खोने वाले परिवारों को वित्तीय सहायता प्रदान करती है।",
    ministry: "Ministry of Rural Development",
    lastVerified: new Date("2026-06-30"),
    sourceUrl: "https://nsap.nic.in/"
  },
  {
    schemeId: "lakhpati-didi",
    name: "Lakhpati Didi Yojana",
    nameHindi: "लखपति दीदी योजना",
    category: ["Women Empowerment", "Financial Support"],
    targetGroups: ["Women in SHGs", "Rural Women"],
    eligibility: {
      occupation: ["All"],
      gender: "Female",
      maritalStatus: ["All"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 100000
    },
    benefits: "Skill training and financial linkages to Women Self-Help Groups (SHGs) to help them earn an annual income of ₹1,00,000 or more.",
    benefitsHindi: "महिला स्वयं सहायता समूहों (SHGs) को कौशल प्रशिक्षण और वित्तीय संपर्क ताकि उन्हें ₹1,00,000 या अधिक की वार्षिक आय अर्जित करने में मदद मिल सके।",
    documents: ["Aadhaar Card", "SHG Membership Proof", "Bank Account Details", "Income Certificate"],
    applicationUrl: "https://nrlm.gov.in/",
    helplineNumber: "011-23382747",
    description: "An initiative under the Deendayal Antyodaya Yojana-National Rural Livelihoods Mission (DAY-NRLM) to encourage women to start micro-enterprises and achieve financial independence.",
    descriptionHindi: "दीनदयाल अंत्योदय योजना-राष्ट्रीय ग्रामीण आजीविका मिशन (DAY-NRLM) के तहत महिलाओं को सूक्ष्म उद्यम शुरू करने और वित्तीय स्वतंत्रता प्राप्त करने के लिए प्रोत्साहित करने की एक पहल।",
    ministry: "Ministry of Rural Development",
    lastVerified: new Date("2026-07-28"),
    sourceUrl: "https://lakhpatididi.gov.in/"
  },
  {
    schemeId: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    nameHindi: "सुकन्या समृद्धि योजना",
    category: ["Savings", "Child Welfare"],
    targetGroups: ["Girl Child", "Parents of Girls"],
    eligibility: {
      occupation: ["All"],
      gender: "Female", // the account is for the girl child
      maritalStatus: ["Single"],
      minLandAcres: 0,
      maxLandAcres: 9999,
      states: ["All"],
      maxAnnualIncome: 9999999
    },
    benefits: "High-interest savings account for girl children, providing tax benefits under Section 80C and financial security for their education and marriage.",
    benefitsHindi: "बालिकाओं के लिए उच्च-ब्याज बचत खाता, जो धारा 80C के तहत कर लाभ और उनकी शिक्षा और विवाह के लिए वित्तीय सुरक्षा प्रदान करता है।",
    documents: ["Birth Certificate of Girl Child", "Aadhaar Card of Parent/Guardian", "Address Proof of Parent/Guardian"],
    applicationUrl: "https://www.indiapost.gov.in/",
    helplineNumber: "1800-266-6868",
    description: "A government-backed savings scheme targeted at the parents of girl children, encouraging them to build a fund for the future education and marriage expenses of their female child.",
    descriptionHindi: "बालिकाओं के माता-पिता के लक्षित एक सरकारी समर्थित बचत योजना, जो उन्हें अपनी बच्ची की भविष्य की शिक्षा और विवाह के खर्चों के लिए एक कोष बनाने के लिए प्रोत्साहित करती है।",
    ministry: "Ministry of Finance",
    lastVerified: new Date("2026-07-01"),
    sourceUrl: "https://www.nsiindia.gov.in/"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Clearing old schemes...');
    await Scheme.deleteMany({});
    
    // Attempt to generate embeddings if API key is present
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (apiKey) {
      console.log('Generating embeddings for true RAG...');
      // Note: using the older @langchain/google-genai or the new @google/genai SDK is possible. 
      // Using @langchain/google-genai GoogleGenerativeAIEmbeddings for simplicity
      const { GoogleGenerativeAIEmbeddings } = await import("@langchain/google-genai");
      const embeddings = new GoogleGenerativeAIEmbeddings({
        modelName: "text-embedding-004",
        apiKey: apiKey
      });

      for (let i = 0; i < schemesData.length; i++) {
        const scheme = schemesData[i];
        const textToEmbed = `Name: ${scheme.name}\nDescription: ${scheme.description}\nTarget: ${scheme.targetGroups.join(', ')}\nBenefits: ${scheme.benefits}`;
        const vector = await embeddings.embedQuery(textToEmbed);
        scheme.embedding = vector;
        console.log(`Embedded ${i + 1}/${schemesData.length}: ${scheme.schemeId}`);
        // Add artificial delay to respect free tier rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } else {
      console.warn('WARNING: No Gemini API Key found. Skipping embedding generation.');
    }

    console.log('Seeding new schemes...');
    await Scheme.insertMany(schemesData);
    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
