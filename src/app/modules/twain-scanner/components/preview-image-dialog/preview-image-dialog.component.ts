import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-image-dialog',
  templateUrl: './preview-image-dialog.component.html',
  styleUrls: ['./preview-image-dialog.component.css'],
})
export class PreviewImageDialogComponent implements OnInit {
  ngOnInit() {
    // acquire images from TWAIN scanner
    this.__acquireImageFromTwainScanner();
  }

  /**
   * Acquires images from TWAIN scanner.
   */
  __acquireImageFromTwainScanner() {
    let Vintasoft = window.Vintasoft;
    // register the evaluation version of VintaSoft Web TWAIN service
    // please read how to get evaluation license in documentation: https://www.vintasoft.com/docs/vstwain-dotnet-web/Licensing-Twain_Web-Evaluation.html
    Vintasoft.Twain.WebTwainGlobalSettingsJS.register(
      'Abdelfattah  Ragab',
      'abdelfattah@workforce360.org',
      'LIdy/mZuoWIFHQJPESIuwlDEIOt5W8sQNPs7chaW2WytvLFFLKlvVved5NH08coC8ueovM3misqVN1Mx7cz143wWUDEBW0WaQZvbknLH7piOO7E1mIaVkY7VxbkwUQmCd9T8uZxyToatUddGyF/Sms+Q4s5JLYz67PjCZrde1hs',
      '2023-06-08'
    );

    // URL to the VintaSoft Web TWAIN service
    let serviceUrl: string;
    if (window.location.protocol == 'http:')
      serviceUrl = 'http://localhost:25319/api/VintasoftTwainApi';
    else serviceUrl = 'https://localhost:25329/api/VintasoftTwainApi';
    // a Web API controller that allows to work with TWAIN devices
    let twainService: Vintasoft.Shared.WebServiceControllerJS =
      new Vintasoft.Shared.WebServiceControllerJS(serviceUrl);

    // TWAIN device manager
    let twainDeviceManager: Vintasoft.Twain.WebTwainDeviceManagerJS =
      new Vintasoft.Twain.WebTwainDeviceManagerJS(twainService);

    // the default settings of TWAIN device manager
    let deviceManagerInitSetting: Vintasoft.Twain.WebTwainDeviceManagerInitSettingsJS =
      new Vintasoft.Twain.WebTwainDeviceManagerInitSettingsJS();

    try {
      // open TWAIN device manager
      twainDeviceManager.open(deviceManagerInitSetting);
    } catch (ex) {
      alert(ex);
      return;
    }

    let twainDevice: Vintasoft.Twain.WebTwainDeviceJS | null = null;
    try {
      // get the default TWAIN device
      twainDevice = twainDeviceManager.get_DefaultDevice();
      // open TWAIN device (do not display device UI but display dialog with image scanning progress)
      twainDevice.open(false, true);

      let acquireModalState: number;
      do {
        // do one step of modal image acquisition process
        let acquireModalResult: Vintasoft.Twain.WebTwainDeviceAcquireModalResultJS =
          twainDevice.acquireModalSync();
        // get state of image acquisition
        acquireModalState = acquireModalResult
          .get_AcquireModalState()
          .valueOf() as number;

        switch (acquireModalState) {
          case 2: // image is acquired
            // get acquired image
            let acquiredImage: Vintasoft.Twain.WebAcquiredImageJS =
              acquireModalResult.get_AcquiredImage();
            // get image as Base64 string
            let bitmapAsBase64String: string =
              acquiredImage.getAsBase64String();
            // update image preview
            let previewImageElement: HTMLImageElement = document.getElementById(
              'previewImage'
            ) as HTMLImageElement;
            previewImageElement.src = bitmapAsBase64String;
            break;
          case 4: // scan is failed
            alert(acquireModalResult.get_ErrorMessage());
            break;
          case 9: // scan is finished
            break;
        }
      } while (acquireModalState !== 0);
    } catch (ex) {
      alert(ex);
    } finally {
      if (twainDevice != null) {
        // close the device
        twainDevice.close();
      }
      // close the device manager
      twainDeviceManager.close();
    }
  }
}
