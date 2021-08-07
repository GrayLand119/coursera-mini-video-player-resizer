const getVideoPlayer = () => document.querySelector('#main > div > div.rc-VideoMiniPlayer');

const getVideoPlayerContainer = () => document.querySelector('#main > div > div.rc-VideoMiniPlayer > div.video-main-player-container');

const getVideoControls = () => document.querySelector('#main > div > div.rc-VideoMiniPlayer.mini > div.rc-VideoMiniControls');

const createVideoResizer = () => {
    const videoResizer = document.createElement('div');
    videoResizer.style.width = '2em';
    videoResizer.style.height = '2em';
    videoResizer.style.background = 'linear-gradient(to right bottom, #616161 10%, #9E9E9E 10%, #9E9E9E 20%, #616161 20%, #616161 30%, #9E9E9E 30%, #9E9E9E 40%, #616161 40%, #616161 50%, #9E9E9E 50%)';
    videoResizer.style.border = 'solid';
    videoResizer.style.borderColor = '#E0E0E0';
    videoResizer.style.cursor = 'nw-resize';

    return videoResizer;
};

const main = () => {
    const videoRatio = getVideoPlayer().clientWidth / getVideoPlayer().clientHeight;

    let miniVideoWidth = null;

    const videoResizer = createVideoResizer();
    if (getVideoControls() != null) {
        getVideoControls().appendChild(videoResizer);
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
            getVideoControls().style.width = miniVideoWidth + 'px';
            getVideoControls().style.height = miniVideoHeight + 'px';
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
        getVideoControls().style.width = miniVideoWidth + 'px';
        getVideoControls().style.height = miniVideoHeight + 'px';
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
const jsLoaded = () => {
    if (getVideoControls() != null) {
        clearInterval(jsInitChecktimer);
        main();
    }
};

window.addEventListener('load', () => {
    jsInitChecktimer = setInterval(jsLoaded, 500);
});
