'use strict';

describe('dashboard app', function() {


	it('Pokud jsme na index.html, stranka nas presmeruje na /view1', function() {
		browser.get('index.html');
		expect(browser.getLocationAbsUrl()).toMatch("/view1");
	});

	it('Kontrola titulku.', function() {
		expect(browser.getTitle()).toEqual('Dashboard');
	});

	describe('Zavření widgetu koláčového grafu', function() {
		beforeEach(function() {
			browser.get('index.html#/view1');
		});

		it('Koláčový graf je na stránce', function() {
			expect(element.all(by.css('.panel-heading')).first().getText()
					=== "Věk studentů magisterského studia v roce 2015");
		});

		it('Koláčový graf byl odstraněn ze stránky', function() {
			// odstranění koláčového grafu ze stránky
			var el = element.all(by.css('.close')).first();
			el.click();

			expect(element.all(by.css('.panel-heading')).first().getText()
					=== "Věk studentů magisterského studia v roce 2015")
					.toBe(false);
		});

	});

	describe('Vytvoreni widgetu kolacoveho grafu', function() {
		beforeEach(function() {
			browser.get('#/view2');
		});

		it('Textovy widget neni na strance', function() {
			// odstranění textového widgetu ze stránky
			var el = element.all(by.css('.close')).first();
			el.click();

			//Informační widget byl odstraněn ze stránky
			expect(element.all(by.css('.panel-heading')).first().getText()
					=== "Informační widget").toBe(false);
		});

		it('Koláčový graf byl odstraněn ze stránky', function() {
			// odstranění koláčového grafu ze stránky
			var el = element.all(by.css('.close')).first();
			el.click();

			expect(element.all(by.css('.panel-heading')).first().getText()
					=== "Věk studentů magisterského studia v roce 2015")
					.toBe(false);
		});

		it('Po zmáčknutí tlačítka na vytvoření widgetu je widget úspěšně vytvořen', function() {
			// odstranění koláčového grafu ze stránky
			var el = element.all(by.css('.addTextWidget')).first();
			el.click();

			expect(element.all(by.css('.panel-heading')).first().getText()
					=== "Vygenerovaný textový widget");
		});

	});
});