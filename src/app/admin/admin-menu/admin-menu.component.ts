import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MenuService } from '../../services/menu.service';
import { AuthenticationService } from '../../services/authenticate.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  private menuId;
  private menuCategories;

  private newCategoryDialogues = [];
  private newItemDialogues = {};

  constructor(private menuService : MenuService,
              private authService : AuthenticationService) {}

  ngOnInit() {
    this.authService.getAdminMenu().subscribe(
      (data: any) => {
        this.menuService.getFullMenu().subscribe(
          (data: any) => {
            this.menuId = data.venue[0].menuId._id;
            this.menuCategories = data.venue[0].menuId.menuCategoryId;
            this.initializeArraysForHTML();
          }
        );
      }
    )
  }

  initializeArraysForHTML() : void {
    for(var i = 0; i < this.menuCategories.length; i++) {
      var currentMenuCategory = this.menuCategories[i]._id;
      this.newItemDialogues[currentMenuCategory] = [];
    }
    console.log(this.newItemDialogues);
  }

  setClickHandlers(thisClass) : void {
    var thisClass = thisClass;
    $(document).ready(function(){
      /*$("#add-category").click(function(){
        thisClass.showCategoryForm();
      });
      $(".cancel-category").click(function(){
        thisClass.hideCategoryForm(this);
      });
      $(".save-category").click(function(){
        thisClass.addCategory(this);
      });
      $(".add-item").click(function(){
        thisClass.showItemForm(this);
      });
      $(".cancel-item").click(function(){
        thisClass.hideItemForm(this);
      });
      $(".save-item").click(function(){
        thisClass.addItem(this);
      });
      $(".remove-item").click(function(){
        thisClass.removeItem(this);
      });
      $(".category-header").click(function(){
        thisClass.expandItems(this);
      });
      $(".remove-all").click(function(){
        thisClass.removeAll(this);
      });
      $(".remove-category").click(function(){
        thisClass.removeCategory(this);
      });*/
    });
  }

  showCategoryForm() : void {
    this.newCategoryDialogues.push("newCategoryDialogue");
    console.log(this.newCategoryDialogues);
  }

  hideCategoryForm() : void {
    this.newCategoryDialogues.pop();
    console.log(this.newCategoryDialogues);
  }

  addCategory(event) : void {
    var clickedElement = event.target;
    var dialogueElem = $(clickedElement).parent().parent();
    var newCategoryName = $(dialogueElem).find(".add-category-name").val();
    var userObj = JSON.parse(localStorage.getItem('user'));

    var categoryObj = {
      name: newCategoryName,
      venueId: userObj.venueId
    };

    this.menuService.addCategory(categoryObj).subscribe(
      (data: any) => {
        if(data.success) {
          this.newCategoryDialogues = [];
          this.ngOnInit();
        }
      }
    );

  }

  showItemForm(menuCategoryId) : void {
    this.newItemDialogues[menuCategoryId].push("newItemDialogue");
    console.log(this.newItemDialogues);
  }

  hideItemForm(menuCategoryId) : void {
    this.newItemDialogues[menuCategoryId].pop();
    console.log(this.newItemDialogues);
  }

  addItem(event) : void {
    var clickedElement = event.target;
    var categoryItems = $(clickedElement).parent().parent().parent();
    var dialogueElem = $(clickedElement).parent().parent();
    var newItemName = $(dialogueElem).find(".add-item-name").val();
    var newItemPrice = parseFloat($(dialogueElem).find(".add-item-price").val()).toFixed(2);
    var menuCategory = $(categoryItems).parent();
    var menuCategoryId = $(menuCategory).data("menucategoryid");

    var itemObj = {
      name: newItemName,
      price: newItemPrice,
      menuCategoryId: menuCategoryId
    };

    this.menuService.addItem(itemObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.success) {
          this.ngOnInit();
        }
      }
    );
  }

  removeItem(event) : void {
    var clickedElement = event.target;
    var itemId = $(clickedElement).closest(".item-cont").attr("data-itemid");
    var menuCategoryId = $(clickedElement).closest(".category-cont").attr("data-menucategoryid");
    var data = {
      itemId: itemId,
      menuCategoryId: menuCategoryId
    };

    this.menuService.removeItem(data).subscribe(
      (data: any) => {
        $(clickedElement).closest(".item-cont").remove();
      }
    );
  }

  expandItems(event) : void {
    var clickedElement = event.target;
    var categoryCont = $(clickedElement).parent();
    var categoryItems = $(categoryCont).find(".category-items");

    $(categoryItems).slideToggle("400");
    $(categoryCont).find(".arrow-icon").toggleClass('flip');
  }

  removeAll(event) : void {
    var clickedElement = event.target;
    var menuContent = $(clickedElement).parent().parent();
    var categoryCont = $(menuContent).find(".category-cont");

    $(categoryCont).remove(".clone");
  }

  removeCategory(event) : void {
    var clickedElement = event.target;
    var menuCategoryCont = $(clickedElement).closest(".category-cont");
    var menuCategoryId = $(menuCategoryCont).attr("data-menucategoryid");
    var data = {
      menuId: this.menuId,
      menuCategoryId: menuCategoryId
    };

    this.menuService.removeCategory(data).subscribe(
      (data: any) => {
        $(menuCategoryCont).remove();
      }
    );
  }

}
