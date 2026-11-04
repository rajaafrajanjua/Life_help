export default function Disclaimer() {
  return (
    <div style={{
      background: '#f8f9fb',
      borderTop: '1px solid #e8eaf0',
      padding: 'clamp(20px,3vw,28px) 24px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{
          fontSize: '11px', color: '#9999a5', lineHeight: '1.75', textAlign: 'center',
        }}>
          <strong style={{ color: '#6b6b70' }}>Disclosure:</strong> PolicyCove is an independent life insurance brokerage, not an insurance carrier. 
          Products and coverage availability vary by state. All policies are subject to carrier underwriting approval, state availability, 
          eligibility requirements, and applicable policy terms and conditions. Cash value accumulation and policy benefits are subject to 
          policy terms. No specific coverage outcomes, savings, or guaranteed approval are implied or promised. 
          PolicyCove does not provide legal, tax, or financial planning advice. Consult a qualified professional for such guidance. 
          Licensed insurance professionals. For licensing information, please contact us directly.
        </p>
      </div>
    </div>
  );
}
