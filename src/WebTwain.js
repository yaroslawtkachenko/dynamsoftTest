import React, { useEffect, useState } from 'react';
import Dynamsoft from 'dwt';
import DynamsoftBr from './Dynamsoft';

const WebTwain = () => {
    const [img, setImg] = useState(null);

    let dwObject;
    const dynamsoftOnReady = () => {
        dwObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
        if (dwObject) {
            dwObject.Width = 200;
            dwObject.Height = 600;
            dwObject.ShowImageEditor("dwtcontrolContainerLargeViewer", 750, 600);
            dwObject.SetViewMode(1, 4);
        }
    };

    useEffect(() => {
        Dynamsoft.WebTwainEnv.AutoLoad = true;
        /**
         * In order to use the full version, do the following
         * 1. Change Dynamsoft.WebTwainEnv.Trial to false
         * 2. Replace A-Valid-Product-Key with a full version key
         * 3. Change Dynamsoft.WebTwainEnv.ResourcesPath to point to the full version
         *    resource files that you obtain after purchasing a key
         */
        Dynamsoft.WebTwainEnv.Trial = true;
        Dynamsoft.WebTwainEnv.ProductKey = "t0140lQMAAAC3wRQTBlW1t/iFtLy1kRS/EBaNFxuWfuWn+BZF051y+VViEaDJrauITlJsYxDkG1DdEmwZN6gmld6Dmwfk8b5j/8wyhG7DgqnsUWIs+yuG8R9m0dtdmuxpMw7EjRWMcyM0jyG7vYNnPo0VjHMjNE8h8z5MjRaMFYxzI+BGExPiiob+BaEEsjo=";
        Dynamsoft.WebTwainEnv.ResourcesPath = "https://tst.dynamsoft.com/libs/dwt/15.3.1";
        Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', dynamsoftOnReady);
    }, []);

    const handleClick = () => {
        if (dwObject) {
            dwObject.Width = 200;
            dwObject.Height = 600;
            dwObject.ShowImageEditor("dwtcontrolContainerLargeViewer", 750, 600);
            dwObject.SetViewMode(1, 4);

            var bSelected = dwObject.SelectSource();
            if (bSelected) {
                var onAcquireImageSuccess = function () { dwObject.CloseSource(); };
                var onAcquireImageFailure = onAcquireImageSuccess;
                dwObject.OpenSource();
                dwObject.AcquireImage({}, onAcquireImageSuccess, onAcquireImageFailure);
            }
        } else {
            alert("Please press 'Load DWT' first!");
        }
    }

    const handleSave = () => {
        setImg(dwObject.SaveSelectedImagesToBase64Binary())
    }

    const loadImages = () => {
        if (dwObject) {
            if (dwObject.Addon && dwObject.Addon.PDF) {
                dwObject.Addon.PDF.SetResolution(300);
                dwObject.Addon.PDF.SetConvertMode(1);
            }
            dwObject.LoadImageEx('', 5,
                function () {
                    dwObject._ImgManager._UIEditor.go(dwObject.CurrentImageIndexInBuffer);
                },
                function (errorCode, errorString) {
                    alert('Load Image:' + errorString);
                }
            );
        }
    }

    const parseBarcode = async () => {
        const reader = await DynamsoftBr.BarcodeReader.createInstance();
        const idx = dwObject.GetSelectedImageIndex(0);
        const url = dwObject.GetImageURL(idx);
        console.log('parse started')
        const results = await reader.decodeUrl(url);
        for(let i = 0; i < results.length; ++i){
            console.log(results[i]);
            console.log(results[i].BarcodeText);
        }
    }

    const getMethods = () => console.log(img);

    return (
        <div>
            <button onClick={handleClick}>Scan Document</button>
            <button onClick={loadImages}>Open a local file</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={getMethods}>Save</button>
            <button onClick={parseBarcode}>parseBarcode</button>
            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div id="dwtcontrolContainer"></div>
                <div id="dwtcontrolContainerLargeViewer"></div>
            </div>
        </div>
    );
};

export default WebTwain;
