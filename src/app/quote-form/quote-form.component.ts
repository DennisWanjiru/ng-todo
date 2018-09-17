import { Quote } from "./../quote";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "quote-form",
  templateUrl: "./quote-form.component.html",
  styleUrls: ["./quote-form.component.css"]
})
export class QuoteFormComponent {
  constructor() {
    if (this.getPrevQoutes()) {
      this.quotes = this.getPrevQoutes();
    }
  }

  quotes = [];
  model = new Quote(0, "", 0, 0);
  created = "Qoute was sucessfully created!";
  deleted = "Qoute was deleted sucessfully!";

  getPrevQoutes() {
    const data = localStorage.getItem("qoutes");
    return JSON.parse(data);
  }

  removeQuote(id) {
    const nonDeleted = this.quotes.filter(quote => quote.id !== id);
    this.quotes = nonDeleted;
    localStorage.setItem("qoutes", JSON.stringify(nonDeleted));
    this.alertSuccess();
  }

  onLike(id) {
    const likes = this.quotes.map(quote => {
      if (quote.id === id) {
        quote.likes++;
      }
      return quote;
    });

    localStorage.setItem("qoutes", JSON.stringify(likes));
  }

  onDislike(id) {
    const likes = this.quotes.map(quote => {
      if (quote.id === id) {
        quote.dislikes++;
      }
      return quote;
    });

    localStorage.setItem("qoutes", JSON.stringify(likes));
  }

  onSubmit(quote) {
    let id = Math.max(...this.quotes.map(quote => quote.id)) + 1;
    id < 0 ? (id = 1) : (id = id);
    const likes = 0;
    const dislikes = 0;
    this.model = new Quote(id, quote.value, likes, dislikes);
    const data = JSON.parse(this.diagnostic);
    this.quotes.push(data);
    quote.value = "";
    this.quotes.length > 0
      ? localStorage.setItem("qoutes", JSON.stringify(this.quotes))
      : "";
    this.alertSuccess();
  }

  alertSuccess() {
    var x = document.getElementById("snackbar");
    var y = document.getElementById("deleted");

    // Add the "show" class to DIV
    x.className = "show";
    y.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(() => (x.className = x.className.replace("show", "")), 3000);
    setTimeout(() => (y.className = y.className.replace("show", "")), 3000);
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
