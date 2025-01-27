const getVideoPlayer = () => document.querySelector('div.rc-VideoMiniPlayer');
const getVideoPlayerContainer = () => document.querySelector('div.video-main-player-container');
const getVideoControls = () => document.querySelector('div.rc-VideoControlsContainer');

const createVideoResizer = () => {
    const videoResizer = document.createElement('div');
    videoResizer.style.width = '2em';
    videoResizer.style.height = '2em';
    videoResizer.style.background = 'linear-gradient(to right bottom, #616161 10%, #9E9E9E 10%, #9E9E9E 20%, #616161 20%, #616161 30%, #9E9E9E 30%, #9E9E9E 40%, #616161 40%, #616161 50%, #9E9E9E 50%)';
    videoResizer.style.border = 'solid';
    videoResizer.style.borderColor = '#E0E0E0';
    videoResizer.style.cursor = 'nw-resize';
    videoResizer.style.position = 'absolute';
    videoResizer.style.top = '0px';
    videoResizer.style.left = '0px';

    return videoResizer;
};

const main = () => {
    const videoRatio = getVideoPlayer().clientWidth / getVideoPlayer().clientHeight;
    getVideoPlayerContainer().style.width = 750 + 'px';
    
    let miniVideoWidth = null;

    const videoResizer = createVideoResizer();
    // if (getVideoControls() != null) {
    //     getVideoControls().appendChild(videoResizer);
    // }

    if (getVideoPlayerContainer() != null) {
        getVideoPlayerContainer().appendChild(videoResizer);
    }

    const videoPlayerObserver = new MutationObserver(() => {
        if (getVideoControls() != null) {
            getVideoControls().appendChild(videoResizer);

            if (miniVideoWidth === null) {
                return;
            }

            const miniVideoHeight = (miniVideoWidth / videoRatio);
            getVideoPlayerContainer().style.width = miniVideoWidth + 'px';
            getVideoPlayerContainer().style.height = miniVideoHeight + 'px';
            // getVideoControls().style.width = miniVideoWidth + 'px';
            // getVideoControls().style.height = miniVideoHeight + 'px';
        } else {
            getVideoPlayerContainer().style.width = '';
            getVideoPlayerContainer().style.height = '';
        }
    });

    videoPlayerObserver.observe(getVideoPlayer(), { attributes: true });


    let startX;

    const dragVideoResizer = (event) => {
        miniVideoWidth = (startWidth - (event.clientX - startX));
        const miniVideoHeight = (miniVideoWidth / videoRatio);
        getVideoPlayerContainer().style.width = miniVideoWidth + 'px';
        getVideoPlayerContainer().style.height = miniVideoHeight + 'px';
        // getVideoControls().style.width = miniVideoWidth + 'px';
        // getVideoControls().style.height = miniVideoHeight + 'px';
    };

    const stopDragVideoResizer = (_) => {
        document.documentElement.removeEventListener('mousemove', dragVideoResizer);
        document.documentElement.removeEventListener('mouseup', stopDragVideoResizer);
    };

    const initDragVideoResizer = (event) => {
        startX = event.clientX;
        startWidth = getVideoPlayerContainer().clientWidth;
        startHeight = getVideoPlayerContainer().clientHeight;
        document.documentElement.addEventListener('mousemove', dragVideoResizer);
        document.documentElement.addEventListener('mouseup', stopDragVideoResizer);
    };

    videoResizer.addEventListener('mousedown', initDragVideoResizer);
};

let jsInitChecktimer;
let count = 0;
const jsLoaded = () => {
    count += 1;
    if (count > 120) {
        clearInterval(jsInitChecktimer);
        return;
    }
    if (getVideoControls() != null) {
        clearInterval(jsInitChecktimer);
        main();
    }
};

// if (getVideoControls() != null) {
//     main();
// }

var button = document.createElement("Button");
button.innerHTML = "ResizePlayer";
button.style = "top: 0px; right: 0px; position:absolute;z-index: 9999; height: 44px";
button.addEventListener('click', () => {
  // When there is a "click"
  // it shows an alert in the browser
  // alert('Oh, you clicked me!')
  main();
});

document.body.appendChild(button);

// // Create a button element
// const button = document.createElement('input');
// button.id = 'mainButton';
// button.type = "button";

// // Set the button text to 'Can you click me?'
// button.value = 'Load JS';
// // Attach the "click" event to your button

// // Add the button to your HTML <body> tag
// document.body.appendChild(button);


// alert('Oh, you clicked me!')

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     "id": "sampleContextMenu",
//     "title": "Sample Context Menu",
//     "contexts": ["selection"]
//   });
// });

// chrome.commands.onCommand.addListener((command) => {
//   console.log(`Command: ${command}`);
// });

// window.addEventListener('load', () => {
//     jsInitChecktimer = setInterval(jsLoaded, 1000);
//     // document.getElementsByClassName("video-main-player-container")[0].style = "width: 750px"
// });
