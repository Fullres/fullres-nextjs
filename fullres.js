const events = {
  push(data) {
    if (typeof window === 'undefined') {
      console.error('Cannot track events server side!');
      return;
    }
    window.fullres.events.push(data);
  }
};

const metadataHandler = {
  set: function(target, key, value) {
    if (typeof window === 'undefined') {
      console.error('Cannot set metadata server side!');
      return true;
    }
    window.fullres.metadata[key] = value;
    return true;
  }
};

const metadata = new Proxy({}, metadataHandler);

module.exports = { events, metadata };
