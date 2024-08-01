const React = require('react');
const Script = require('next/script').default;
const { events, metadata } = require('./fullres');

if (typeof window !== 'undefined') {
  if (!window.fullres) {
    window.fullres = { events: [], metadata: {} };
  }
}

const FullresTag = function({ siteKey, proxy }) {
  const proxyUrl = proxy || '//t.fullres.net';
  
  return React.createElement(Script, {
    id: 'fullres-analytics',
    strategy: 'afterInteractive',
    src: `${proxyUrl}/${siteKey}.js?${new Date().getTime() - new Date().getTime() % 43200000}`,
    onLoad: () => {
      (function(history) {
        if (!history || history === undefined) {
          return;
        }

        const originalPushState = history.pushState;
        let routeChangeInProgress = false;
		
        history.pushState = function(...args) {
          if (routeChangeInProgress) return;
          routeChangeInProgress = true;

          const onRouteChangeComplete = () => {
			
            originalPushState.apply(history, args);
			
            window.removeEventListener('routeChangeComplete', onRouteChangeComplete);
            routeChangeInProgress = false;
          };
		  
          window.addEventListener('routeChangeComplete', onRouteChangeComplete, { once: true });
		  
          setTimeout(() => {
            if (routeChangeInProgress) {
              onRouteChangeComplete();
            }
          }, 100);
        };

      })(window.history);
    }
  });
};

module.exports = { FullresTag, fullres: { events, metadata } };
