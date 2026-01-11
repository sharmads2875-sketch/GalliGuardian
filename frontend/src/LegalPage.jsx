import { useNavigate } from 'react-router-dom';
import './LegalPage.css';

function LegalPage() {
  const navigate = useNavigate();

  const legalSections = [
    {
      title: 'Animal Protection Laws',
      content: 'The Prevention of Cruelty to Animals Act, 1960, provides protection to all animals, including strays. It is illegal to cause unnecessary pain or suffering to any animal. If you witness animal cruelty, you can file a complaint with local animal welfare organizations or police.',
    },
    {
      title: 'Your Rights & Responsibilities',
      content: 'You have the right to help stray animals in distress, but you must do so safely and legally. It is your responsibility to ensure your own safety first, and to contact appropriate authorities (veterinarians, animal control, or NGOs) when dealing with injured or aggressive animals.',
    },
    {
      title: 'Reporting Animal Cruelty',
      content: 'If you witness animal cruelty or neglect, document the incident with photos or videos (if safe to do so), note the location and time, and report it to: local animal welfare organizations, police, or Animal Welfare Board of India (AWBI). Keep records of your report for follow-up.',
    },
    {
      title: 'First Aid & Emergency Care',
      content: 'Providing first aid to injured stray animals is legal and encouraged, as long as you do so safely and do not cause further harm. However, for serious injuries or emergencies, it is recommended to contact a veterinarian or animal rescue organization immediately.',
    },
    {
      title: 'Community Care',
      content: 'Feeding and caring for community animals (stray dogs/cats) is legal and protected under law. However, ensure that your care practices do not cause nuisance to others. Work with local authorities and animal welfare groups for sustainable community animal care programs.',
    },
    {
      title: 'Adoption & Ownership',
      content: 'Adopting a stray animal is legal and encouraged. Once you adopt, you become the legal guardian and are responsible for the animal\'s welfare, including vaccinations, sterilization, and proper care. Register your pet with local authorities if required by your area\'s regulations.',
    },
  ];

  return (
    <div className="legal-page">
      <div className="legal-background"></div>
      
      <div className="legal-container">
        <header className="legal-header">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back
          </button>
          <h1>⚖️ Legal Help</h1>
          <p>Understanding your rights and responsibilities</p>
        </header>

        <div className="legal-content">
          <div className="legal-intro">
            <div className="intro-icon">📚</div>
            <p>
              This legal guidance module provides information about laws and regulations 
              related to stray animal care and protection. Always consult with legal 
              professionals for specific legal advice regarding your situation.
            </p>
          </div>

          <div className="legal-sections">
            {legalSections.map((section, index) => (
              <div key={index} className="legal-card">
                <div className="legal-card-header">
                  <span className="section-number">{index + 1}</span>
                  <h2>{section.title}</h2>
                </div>
                <div className="legal-card-body">
                  <p>{section.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="legal-disclaimer">
            <div className="disclaimer-icon">ℹ️</div>
            <div>
              <h3>Legal Disclaimer</h3>
              <p>
                The information provided here is for general guidance only and does not 
                constitute legal advice. Laws may vary by jurisdiction. For specific legal 
                questions or situations, please consult with a qualified legal professional 
                or animal law attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegalPage;
