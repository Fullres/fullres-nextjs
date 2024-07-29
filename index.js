const React = require('react');
const Script = require('next/script').default;
const { initFullRes, trackEvent, addMetadata } = require('./fullres');

const FullRes = function({ siteKey }) {
  React.useEffect(function() {
    initFullRes();
  }, []);

  return React.createElement(Script, {
    id: 'fullres-analytics',
    strategy: 'afterInteractive',
    src: `https://t.fullres.net/${siteKey}.js?${new Date().getTime() - new Date().getTime() % 43200000}`
  });
};

module.exports = { FullRes, trackEvent, addMetadata };
