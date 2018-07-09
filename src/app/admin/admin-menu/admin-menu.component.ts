import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var thisClass = this;

    $(document).ready(function(){
      $("#add-category").click(function(){
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
    });
  }

  showCategoryForm() : void {
    var newAddCategoryDialogue = $(".add-category-dialogue").first().clone(true).insertBefore("#add-category");
    $(newAddCategoryDialogue).removeClass("hide");
  }

  hideCategoryForm(clickedElement) : void {
    var dialogueElem = $(clickedElement).parent().parent();
    $(dialogueElem).css('max-height',$(dialogueElem).height()).slideUp(function(){
      $(dialogueElem).remove();
    });
  }

  addCategory(clickedElement) : void {
    var dialogueElem = $(clickedElement).parent().parent();
    var newItemName = $(dialogueElem).find(".add-category-name").val();

    var newAddCategoryCont = $(".category-cont").first().clone(true).insertAfter($(".category-cont").last());
    $(newAddCategoryCont).find(".category-name").text(newItemName);
    $(newAddCategoryCont).removeClass("hide");
    $(newAddCategoryCont).addClass("clone");

    $(dialogueElem).remove();
  }

  showItemForm(clickedElement) : void {
    var newAddItemDialogue = $(".add-item-dialogue").first().clone(true).insertBefore($(clickedElement));
    $(newAddItemDialogue).removeClass("hide");
  }

  hideItemForm(clickedElement) : void {
    var dialogueElem = $(clickedElement).parent().parent();
    $(dialogueElem).css('max-height',$(dialogueElem).height()).slideUp(function(){
      $(dialogueElem).remove();
    });
  }

  addItem(clickedElement) : void {
    var categoryItems = $(clickedElement).parent().parent().parent();
    var dialogueElem = $(clickedElement).parent().parent();
    var newItemName = $(dialogueElem).find(".add-item-name").val();
    var newItemPrice = $(dialogueElem).find(".add-item-price").val();

    var newAddItemCont = $(".item-cont").first().clone(true).insertAfter($(categoryItems).find(".item-cont").last());
    $(newAddItemCont).find(".item-name").text(newItemName);
    $(newAddItemCont).find(".item-price").text(newItemPrice);
    $(newAddItemCont).removeClass("hide");
    $(newAddItemCont).addClass("clone");

    $(dialogueElem).remove();
  }

  removeItem(clickedElement) : void {
    $(clickedElement).parent().parent().remove();
  }

  expandItems(clickedElement) : void {
    var categoryCont = $(clickedElement).parent();
    var categoryItems = $(categoryCont).find(".category-items");

    $(categoryItems).slideToggle("400");
    $(categoryCont).find(".arrow-icon").toggleClass('flip');
  }

  removeAll(clickedElement) : void {
    var menuContent = $(clickedElement).parent().parent();
    var categoryCont = $(menuContent).find(".category-cont");

    $(categoryCont).remove(".clone");
  }

}
