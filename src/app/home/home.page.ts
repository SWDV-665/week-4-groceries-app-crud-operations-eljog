import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Item } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  title = "Grocery"
  items: Array<Item> = [];

  constructor(private toastController: ToastController, private alertController: AlertController) { }

  /**
   * API to trigger adding an item.
   */
  public async addItem() {
    await this.addItemViaPrompt();
  }

  /**
   * Remove the item at given index.
   * @param index item index.
   */
  public async removeItem(index: number) {
    const toast = await this.toastController.create({
      message: 'Removing Item',
      duration: 3000
    });
    await toast.present();

    this.items.splice(index, 1);
  }

  /**
   * Collect item input via alert dialog prompt.
   * @param message optional message. Can be used for displaying error message.
   */
  private async addItemViaPrompt(message: string | undefined = undefined) {
    const prompt = await this.alertController.create({
      header: "Add Item",
      message: message,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Add',
          handler: this.validateAndAddItem,
        }
      ]
    });

    await prompt.present();
  }

  /**
   * Validate and add an item.
   * @param item grocery item.
   */
  private validateAndAddItem = async (item: Item) => {
    // Add if the item is valid
    if (item && item.name.length && item.quantity > 0) {
      this.items.push(item);

      const toast = await this.toastController.create({
        message: `Added Item: ${item.name}, Quantity ${item.quantity}`,
        duration: 3000
      });
      await toast.present();
    }
    else {
      // Show the prompt again, if the item is not valid.
      this.addItemViaPrompt("Please eneter valid data");
    }
  }

}
