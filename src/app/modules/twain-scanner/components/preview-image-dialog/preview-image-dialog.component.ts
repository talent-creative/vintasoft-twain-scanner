import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-image-dialog',
  templateUrl: './preview-image-dialog.component.html',
  styleUrls: ['./preview-image-dialog.component.css'],
})
export class PreviewImageDialogComponent implements OnInit, OnDestroy {
  devices: Vintasoft.Twain.WebTwainDeviceJS[] = [];
  twainDevice: Vintasoft.Twain.WebTwainDeviceJS | null = null;
  twainDeviceManager: Vintasoft.Twain.WebTwainDeviceManagerJS | null = null;
  isPreview = false;
  constructor(private cdr: ChangeDetectorRef) {}
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
    this.twainDeviceManager = new Vintasoft.Twain.WebTwainDeviceManagerJS(
      twainService
    );

    // the default settings of TWAIN device manager
    let deviceManagerInitSetting: Vintasoft.Twain.WebTwainDeviceManagerInitSettingsJS =
      new Vintasoft.Twain.WebTwainDeviceManagerInitSettingsJS();

    try {
      // open TWAIN device manager
      this.twainDeviceManager.open(deviceManagerInitSetting);
    } catch (ex) {
      alert(ex);
      return;
    }

    try {
      this.devices = this.twainDeviceManager.get_Devices();
      if (this.devices && this.devices.length > 0) {
        this.twainDevice = this.devices[0];
      }
      this.cdr.markForCheck();
      console.log('dvcss ', this.devices);
    } catch (ex) {
      console.log(' errr ... ', ex);
      alert(ex);
    }
    // finally {
    //   // if (twainDevice != null) {
    //   //   // close the device
    //   //   twainDevice.close();
    //   // }
    //   // // close the device manager
    //   // twainDeviceManager.close();
    // }
  }

  onSelect() {
    console.log(' dv ', this.twainDevice);
  }

  getDeviceName(device: any) {
    let name = '';
    Object.values(device).forEach((value) => {
      if (value && typeof value === 'string' && value.length > 5)
        name += value + ' - ';
    });
    if (name.length > 3) name = name.substring(0, name.length - 3);
    return name;
  }

  onReset() {
    this.isPreview = false;
  }

  onScan() {
    this.isPreview = true;
    setTimeout(() => {
      try {
        // get the default TWAIN device
        // twainDevice = twainDeviceManager.get_DefaultDevice();
        // open TWAIN device (do not display device UI but display dialog with image scanning progress)
        if (this.twainDevice !== null) {
          this.twainDevice.open(false, true);

          let acquireModalState: number;
          do {
            // do one step of modal image acquisition process
            let acquireModalResult: Vintasoft.Twain.WebTwainDeviceAcquireModalResultJS =
              this.twainDevice.acquireModalSync();
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
                let previewImageElement: HTMLImageElement =
                  document.getElementById('previewImage') as HTMLImageElement;
                previewImageElement.src = bitmapAsBase64String;
                break;
              case 4: // scan is failed
                alert(acquireModalResult.get_ErrorMessage());
                break;
              case 9: // scan is finished
                break;
            }
          } while (acquireModalState !== 0);
        }
      } catch (ex) {
        this.isPreview = false;
      } finally {
        if (this.twainDevice != null) {
          // close the device
          this.twainDevice.close();
        }
      }
    }, 0);
  }

  ngOnDestroy(): void {
    // close the device manager
    if (this.twainDeviceManager) this.twainDeviceManager.close();
  }
}
