import base64 from 'react-native-base64';

import CredentialStorage from '../credentials/CredentialStorage';

//TODO: Generalise request into get(params), post(body)
class SapRequestHandler {
  static baseUrl = 'http://10.0.0.17:8101/sap/bc/gui/sap/its/zwm_rfn';

  static username = 'FILKOZ';
  static password = 'COMPO2SITION4';

  static async login(username, password) {
    return await fetch(SapRequestHandler.baseUrl + '/mdata', {
      method: 'GET',
      headers: {
        'x-csrf-token': 'Fetch',
        Authorization: 'Basic ' + base64.encode(username + ':' + password),
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.headers.get('x-csrf-token');
        } else if (response.status === 401) {
          throw new Error('Λάθος όνομα χρήστη/κωδικός πρόσβασης');
        } else if (response.status === 500) {
          throw new Error('SAP Server is down');
        } else {
          throw new Error('Unhandled HTTP response');
        }
      })
      .catch(error => {
        alert(error);
        //TODO: throw error;
      });
  }

  //TODO: return label stock, handle array of labels with 1 request
  static async getLabelStock(scannedLabels, lgortIn) {
    const credentials = JSON.parse(await CredentialStorage.getCredentials());

    return Promise.all(
      scannedLabels.map(async currentLabel => {
        return fetch(
          SapRequestHandler.baseUrl +
            '/mdata' +
            '?matnr=' +
            currentLabel.matnr +
            '&charg=' +
            currentLabel.charg +
            '&menge=' +
            currentLabel.menge +
            '&lgort_in=' +
            lgortIn,
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'x-csrf-token': credentials.token,
              Authorization:
                'Basic ' +
                base64.encode(
                  credentials.username + ':' + credentials.password,
                ),
            },
          },
        )
          .then(async response => {
            if (response.status === 200) {
              jsonResponse = await response.json();

              if (jsonResponse[0].CHECKMARK) {
                currentLabel.validity = true;
              } else {
                currentLabel.validity = false;
              }
            } else if (response.status === 500) {
              throw new Error('SAP Server is down');
            } else {
              throw new Error('Unhandled HTTP Response');
            }

            return currentLabel;
          })
          .catch(error => {
            alert(error);
          });
      }),
    );
  }

  static async getHandlingUnitData(handlingUnit) {
    const credentials = JSON.parse(await CredentialStorage.getCredentials());

    return await fetch(
      SapRequestHandler.baseUrl + '/mdata' + '?exidv=' + handlingUnit,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'x-csrf-token': credentials.token,
          Authorization:
            'Basic ' +
            base64.encode(credentials.username + ':' + credentials.password),
        },
      },
    )
      .then(async response => {
        if (response.status === 200) {
          return await response.json();
        } else if (response.status === 401) {
          throw new Error('Λάθος όνομα χρήστη/κωδικός πρόσβασης');
        } else if (response.status === 500) {
          throw new Error('SAP Server is down');
        } else {
          throw new Error('Unhandled HTTP response');
        }
      })
      .catch(error => {
        //alert(error);
      });
  }

  static async createPickingRequest(handlingUnit, deliveryNr) {
    const credentials = JSON.parse(await CredentialStorage.getCredentials());

    let bodyData = {exidv: handlingUnit, vbeln: deliveryNr};

    let csrfToken = await this.login();

    if (csrfToken !== undefined) {
      CredentialStorage.setCredentials(
        SapRequestHandler.username,
        SapRequestHandler.password,
        csrfToken,
      );
    }

    return await fetch(SapRequestHandler.baseUrl + '/picking', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-csrf-token': csrfToken,
        Authorization:
          'Basic ' +
          base64.encode(credentials.username + ':' + credentials.password),
      },
      body: JSON.stringify(bodyData),
    })
      .then(async response => {
        if (response.status === 200) {
          return await response.json();
        } else if (response.status === 500) {
          //TODO: start offline mode
          throw new Error('SAP Server is down');
        } else {
          throw new Error('Unhandled HTTP Response');
        }
      })
      .catch(error => {
        //alert(error);
      });
  }

  static async getProductionOrderData(productionOrder) {
    const credentials = JSON.parse(await CredentialStorage.getCredentials());

    return await fetch(
      SapRequestHandler.baseUrl + '/mdata' + '?aufnr=' + productionOrder,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'x-csrf-token': credentials.token,
          Authorization:
            'Basic ' +
            base64.encode(credentials.username + ':' + credentials.password),
        },
      },
    )
      .then(async response => {
        if (response.status === 200) {
          return await response.json();
        } else if (response.status === 401) {
          throw new Error('Λάθος όνομα χρήστη/κωδικός πρόσβασης');
        } else if (response.status === 500) {
          throw new Error('SAP Server is down');
        } else {
          throw new Error('Unhandled HTTP response');
        }
      })
      .catch(error => {
        //alert(error);
      });
  }
}

export default SapRequestHandler;
