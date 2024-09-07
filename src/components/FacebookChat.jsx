// src/components/FacebookChat.js
import React, { useEffect } from 'react';

const FacebookChat = () => {
  useEffect(() => {
    // Load the Facebook SDK asynchronously
    const loadFacebookSDK = () => {
      // Check if the Facebook SDK script is already loaded
      if (window.FB) {
        // Facebook SDK is already loaded, initialize it
        initializeFB();
      } else {
        // Facebook SDK is not loaded, load it and then initialize
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

    const initializeFB = () => {
      window.FB.init({
        xfbml: true,
        version: 'v15.0', // Ensure you use the latest or required version
      });

      // Optionally customize the chat plugin settings
      window.FB.CustomerChat.update({
        logged_in_greeting: 'Hello! How can we assist you today?',
        logged_out_greeting: 'Please log in to start chatting with us.',
        ref: 'special_offer', // Custom reference parameter
      });
    };

    loadFacebookSDK();
  }, []);

  return (
    <div
      className="fb-customerchat"
      attribution="setup_tool"
      page_id={process.env.REACT_APP_FACEBOOK_PAGE_ID}
      theme_color="#0084ff"
    ></div>
  );
};

export default FacebookChat;
