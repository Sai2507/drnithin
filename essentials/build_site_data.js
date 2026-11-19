const fs = require('fs');

const conditions = JSON.parse(fs.readFileSync('all_conditions_structured.json', 'utf8'));
const blogs = JSON.parse(fs.readFileSync('blogs_structured.json', 'utf8'));
const imageMapping = JSON.parse(fs.readFileSync('image_mapping.json', 'utf8'));

// Refine condition titles and categories
conditions.forEach(c => {
  if (c.file.includes('meniscus-repair')) {
    c.title = 'Meniscus Repair & Preservation';
    c.category = 'Knee Specialities';
    c.tagline = 'Advanced arthroscopic meniscus repair and joint preservation to restore cushioning, relieve pain, and prevent long-term osteoarthritis.';
    c.overview = 'Meniscus Repair is a specialized minimally invasive arthroscopic procedure to repair tears in the fibrocartilage pads of the knee joint. Led by Dr. Nithin Kumar Bejjanki, modern techniques prioritize meniscus preservation over removal whenever possible, protecting the cartilage and restoring knee joint mechanics for athletes and active individuals.';
    c.symptoms = [
      'Joint line pain along the inner or outer knee',
      'Knee locking, catching, or inability to fully straighten the leg',
      'Swelling and stiffness that worsens over 24–48 hours after twisting injury',
      'Instability or sensation of the knee giving way during pivoting',
      'Difficulty squatting, kneeling, or bearing weight'
    ];
    c.treatments = [
      'Arthroscopic inside-out, outside-in, and all-inside meniscus repair techniques',
      'Meniscal root and radial tear reconstruction',
      'Biologic enhancement with Platelet-Rich Plasma (PRP) to stimulate healing in the red-white vascular zone',
      'Partial meniscectomy strictly when tissue is irreparably damaged, preserving maximum viable meniscus',
      'Personalized progressive weight-bearing and rehabilitation protocol'
    ];
    c.procedure = [
      'Preoperative Planning: High-resolution MRI evaluation to map tear geometry and vascularity',
      'Minimally Invasive Arthroscopy: Two tiny 5mm keyhole incisions for high-definition camera and micro-instruments',
      'Preparation: Debridement of tear edges to stimulate a healing bleeding response',
      'Suture Fixation: Ultra-strong specialized bio-absorbable or non-absorbable suture anchors placed under direct visualization',
      'Rehabilitation: Guided hinged knee brace protection followed by sports-specific return-to-play training'
    ];
    c.faqs = [
      'Q1: How long is recovery after meniscus repair? A: Crutches and brace are typically used for 4–6 weeks, with full return to sports in 3–5 months.',
      'Q2: Can all meniscus tears be repaired? A: Tears in the vascular outer zone have excellent healing potential; Dr. Nithin prioritizes repair over removal whenever feasible.',
      'Q3: When can I walk normally? A: Gradual weight-bearing begins within weeks under guided physiotherapy.'
    ];
    c.image = 'assets/images/2150321574-1-68b7aa09a42f9.webp';
  } else if (c.file.includes('reverse-shoulder-replacement')) {
    c.title = 'Reverse Shoulder Replacement';
    c.category = 'Shoulder Specialities';
    c.tagline = 'Pioneering surgical solution for severe cuff tear arthropathy, complex fractures, and failed prior shoulder surgeries.';
    c.overview = 'Reverse Total Shoulder Replacement is a specialized surgical procedure where the normal ball-and-socket anatomy is reversed: the prosthetic ball is placed on the shoulder socket (glenoid) and the socket onto the upper arm bone (humerus). Under the fellowship-trained expertise of Dr. Nithin Kumar Bejjanki, this design relies on the deltoid muscle rather than the torn rotator cuff to power and stabilize the arm, eliminating debilitating pain and restoring functional overhead movement.';
    c.symptoms = [
      'Severe chronic shoulder pain not relieved by medications or physical therapy',
      'Pseudoparalysis (inability to lift the arm above chest level)',
      'Severe rotator cuff tear arthropathy (combined arthritis and massive tendon tear)',
      'Complex proximal humerus fractures in older active patients',
      'Failed prior conventional shoulder replacement'
    ];
    c.treatments = [
      'Reverse total shoulder arthroplasty with patient-specific 3D preoperative implant planning',
      'Subscapularis and deltoid muscle preservation approaches',
      'Advanced modular glenoid and humeral implants with porous bone ingrowth surfaces',
      'Accelerated postoperative rehabilitation restoring daily independence within weeks'
    ];
    c.procedure = [
      'Preoperative 3D CT Planning: Precise implant sizing and angular alignment tailored to patient anatomy',
      'Minimally Invasive Muscle-Sparing Exposure: Delicate mobilization without damaging the deltoid muscle',
      'Glenosphere & Humeral Component Placement: Secure fixation ensuring biomechanical leverage for the deltoid',
      'Motion Verification & Stability Check: Testing full range of motion prior to anatomical layer closure',
      'Post-Op Recovery: Arm sling support for 3–4 weeks with immediate gentle passive hand/elbow motion and structured physiotherapy'
    ];
    c.faqs = [
      'Q1: How is a reverse shoulder replacement different from conventional replacement? A: It reverses the socket and ball, allowing the deltoid muscle to lift the arm even when rotator cuff tendons are completely torn.',
      'Q2: What is the expected recovery time? A: Most patients achieve independent daily activities by 6–8 weeks, with progressive strength improvements up to 1 year.',
      'Q3: How long do reverse shoulder implants last? A: Modern implants have an expected survivorship of 15–20+ years with outstanding satisfaction rates.'
    ];
    c.image = 'assets/images/2343-68b7b917636b1.webp';
  }

  // Ensure local image path
  if (c.image) {
    let local = imageMapping[c.image];
    if (!local) {
      // try finding in imageMapping
      const fn = c.image.split('/').pop().split('?')[0];
      for (const [k, v] of Object.entries(imageMapping)) {
        if (k.includes(fn)) {
          local = v;
          break;
        }
      }
    }
    c.localImage = local || c.image;
  }
});

// Clean up blog local images
blogs.forEach(b => {
  if (b.image) {
    let local = imageMapping[b.image];
    if (!local) {
      const fn = b.image.split('/').pop().split('?')[0];
      for (const [k, v] of Object.entries(imageMapping)) {
        if (k.includes(fn)) {
          local = v;
          break;
        }
      }
    }
    b.localImage = local || b.image;
  }
});

const siteDatabase = {
  doctor: {
    name: 'Dr. Nithin Kumar Bejjanki',
    title: 'Consultant Orthopaedic, Arthroscopy & Sports Injury Surgeon',
    hospital: 'Yashoda Hospitals, Secunderabad, Telangana',
    address: 'Yashoda Hospitals, Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad, Telangana 500003',
    phone: '+91-7207171115',
    phoneRaw: '+917207171115',
    email: 'nithindoc@gmail.com',
    googleMapsUrl: 'https://maps.app.goo.gl/2T7CGuXVtRkPyk8g7',
    experienceYears: 24,
    qualifications: [
      'MRCS (UK)',
      'FRCS (Tr & Ortho, UK)',
      'MCh Ortho',
      'DSEM (International Olympic Committee)',
      'Calvert Shoulder Fellowship (London, UK)',
      'Knee Fellowship (UK)'
    ],
    summary: 'Dr. Nithin Kumar Bejjanki is an internationally trained orthopaedic surgeon with 24 years of surgical excellence, specialising in arthroscopy, sports injuries, complex knee and shoulder reconstruction, cartilage regeneration, and robotic-assisted surgeries. With advanced training in the UK under globally renowned surgeons, he brings world-class expertise to every patient.',
    heroPortrait: 'assets/images/img-3255-68b6bd668aa62.webp',
    fellowshipPhoto: 'assets/images/At-Belgium.jpg',
    clinicPhoto: 'assets/images/IMG_3700.jpg',
    profilePhoto: 'assets/images/IMG_3701.jpg',
    hospitalBanner: 'assets/images/WhatsApp-Image-2025-09-12-at-5.00.50-PM-1-1024x575.jpeg',
    counters: [
      { label: 'Years of Clinical Excellence', value: 24, suffix: '+', icon: 'award' },
      { label: 'Surgical Success Rate', value: 99, suffix: '%', icon: 'shield-check' },
      { label: 'Positive Patient Feedback', value: 96, suffix: '%', icon: 'heart-pulse' },
      { label: 'Satisfied Patients Restored', value: 17, suffix: 'K+', icon: 'users' }
    ]
  },
  reviews: [
    {
      name: 'Balram Kurva',
      rating: 5,
      date: 'Recent Google Review',
      avatar: 'BK',
      tag: 'General Orthopaedic Consultation',
      text: 'Superb nice explanation and giving good suggestions. The consultation was thorough, comforting, and Dr. Nithin took time to inspect my joint and explain all non-surgical options clearly.'
    },
    {
      name: 'Ashutosh Gupta',
      rating: 5,
      date: 'Verified Patient',
      avatar: 'AG',
      tag: 'Knee ACL Reconstruction',
      text: 'Had undergone ACL reconstruction surgery, Dr Nithin was very professional and clear with instructions and procedure that needs to be followed. Post-op followups and rehab guidelines were top notch!'
    },
    {
      name: 'bommu monish',
      rating: 5,
      date: 'Verified Patient',
      avatar: 'BM',
      tag: 'Knee ACL Surgery',
      text: 'I had my knee ACL surgery with Nithin sir... the surgery was very smooth and painless. After my surgery, sir personally answered all my questions and guided my physio plan.'
    },
    {
      name: 'Srinivas Reddy',
      rating: 5,
      date: 'Verified Patient',
      avatar: 'SR',
      tag: 'Complex Joint Treatment',
      text: 'Nithin gaaru treated with atmost care and performed surgery successfully. Highly recommend for those looking for orthopedic and sports injury related issues in Secunderabad and Hyderabad!'
    },
    {
      name: 'butchibabu m',
      rating: 5,
      date: 'Verified Patient (Age 64)',
      avatar: 'BM',
      tag: 'Shoulder Surgery',
      text: 'Excellent doctor for any ortho related issues. I recently got my shoulder operated (age 64), he has clearly explained the pros/cons as I was hesitant given my age. He also has a very strong and professional team who is always available to clarify any trivial queries. He clearly articulates the post op steps to get back to full spirit at the earliest. Highly recommend!'
    },
    {
      name: 'Yeshwanth Reddy',
      rating: 5,
      date: 'Verified Patient',
      avatar: 'YR',
      tag: 'Sports Knee Injury',
      text: 'Dr. Nithin was very professional and knowledgeable about my knee injury. The doctor listened to my concerns and patiently answered all my questions, recommending conservative treatment before jumping to surgery.'
    }
  ],
  conditions,
  blogs
};

fs.writeFileSync('site_database.json', JSON.stringify(siteDatabase, null, 2));
console.log('Site database built successfully with', conditions.length, 'conditions,', blogs.length, 'blogs,', siteDatabase.reviews.length, 'reviews.');

