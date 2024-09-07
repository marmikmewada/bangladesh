import React, { useEffect } from 'react';

const FacebookChat = () => {
  useEffect(() => {
    // Function to load the Facebook SDK
    const loadFacebookSDK = () => {
      if (window.FB) {
        // SDK already loaded, initialize
        initializeFB();
      } else {
        // SDK not loaded, load it
        window.fbAsyncInit = initializeFB;

        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    };

    // Function to initialize Facebook SDK
    const initializeFB = () => {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        xfbml: true,
        version: 'v15.0',
      });

      // Ensure that CustomerChat is available
      window.FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          if (window.FB.CustomerChat) {
            window.FB.CustomerChat.init({
              app_id: process.env.REACT_APP_FACEBOOK_APP_ID,
              logged_in_greeting: 'Hello! How can we assist you today?',
              logged_out_greeting: 'Please log in to start chatting with us.',
              theme_color: '#0084ff',
              // Other customizations if needed
            });
          } else {
            console.error('FB.CustomerChat is not available.');
          }
        }
      });
    };

    loadFacebookSDK();
  }, []);

  return (
    <div
      className="fb-customerchat"
      attribution="setup_tool"
      page_id={process.env.REACT_APP_FACEBOOK_PAGE_ID}
    ></div>
  );
};

export default FacebookChat;
