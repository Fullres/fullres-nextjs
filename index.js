const React = require('react');
const Script = require('next/script').default;
const { events, metadata } = require('./fullres');

if (typeof window !== 'undefined') {
  if (!window.fullres) {
    window.fullres = { events: [], metadata: {} };
  }
}

const FullresProvider = ({ siteKey, proxy, children }) => {     
  const router = require('next/router').useRouter();                      
  const proxyUrl = proxy || '//t.fullres.net';
  
  React.useEffect(() => {                                   
    const script = document.createElement('script');
    script.id = 'fullres-analytics';
    script.src = `${proxyUrl}/${siteKey}.js?${new Date().getTime() - new Date().getTime() % 43200000}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  React.useEffect(() => {                                         
    window.dispatchEvent(new Event('fullrespageload'));     
  }, [router]);                                          
                                                            
  return children;                                          
};

module.exports = { FullresProvider, fullres: { events, metadata } };
