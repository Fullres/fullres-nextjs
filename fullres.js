const initFullRes = function() {
  if (!window.fullresInitialized) {
    window.fullres = window.fullres || { events: [], metadata: {} };
    window.fullresInitialized = true;
  }
};

const trackEvent = function(eventKey, eventData) {
  if (window.fullres && typeof window.fullres.metadata === 'object') {
    window.fullres.events.push({ key: eventKey, ...eventData });
  } else {
    console.error('FullRes is not initialized properly.');
  }
};

const addMetadata = function(metadata) {
  if (window.fullres && typeof window.fullres.metadata === 'object') {
    window.fullres.metadata = { ...window.fullres.metadata, ...metadata };
  } else {
    console.error('FullRes is not initialized properly.');
  }
};

module.exports = { initFullRes, trackEvent, addMetadata };