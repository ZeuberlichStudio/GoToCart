import React from 'react';
import { LabeledCheckbox, ColorCheckbox } from './checkboxes.component';

export default function Filters(props) {

  function resetFilters(e) {
    e.preventDefault();

    let form = document.getElementsByClassName('catalog-container_filters_form')[0];
    let inputs = form.getElementsByTagName('input');

    for ( let input  of inputs){
      input.type === 'checkbox' ?
      (input.checked = false) : (input.value = null);
    }
  }

  return(
    <div className={ "catalog-container_filters" + " " + props.className }>
      <form onSubmit={ e => props.applyFilters(e) } className="catalog-container_filters_form">
        <div className="catalog-container_filters_form_fieldset">
          <legend>Основные фильтры</legend>
          <LabeledCheckbox label="хит продаж"/>
          <LabeledCheckbox label="хит продаж"/>
          <LabeledCheckbox label="хит продаж"/>
        </div>

        <div className="catalog-container_filters_form_fieldset">
          <legend>Пол и возраст</legend>
          <LabeledCheckbox dataFilter="person" value="male" label="Мужчинам"/>
          <LabeledCheckbox dataFilter="person" value="female" label="Женщинам"/>
          <LabeledCheckbox dataFilter="person" value="boys" label="Мальчикам"/>
          <LabeledCheckbox dataFilter="person" value="girls" label="Девочкам"/>
        </div>

        <div className="catalog-container_filters_form_fieldset">
          <legend>Материал</legend>
          <LabeledCheckbox dataFilter="material" value="leather" label="кожа"/>
          <LabeledCheckbox dataFilter="material" value="metal" label="метал"/>
          <LabeledCheckbox dataFilter="material" value="vinyl" label="ПВХ"/>
        </div>

        <div className="catalog-container_filters_form_fieldset">
          <legend>Бренд</legend>
          <LabeledCheckbox label="Nike"/>
          <LabeledCheckbox label="UniQlo"/>
          <LabeledCheckbox label="Stripes"/>
        </div>

        <div className="catalog-container_filters_form_fieldset">
          <legend>Цвет</legend>
          <ColorCheckbox color="#FFF"/>
          <ColorCheckbox color="lightgray"/>
          <ColorCheckbox color="black"/>
        </div>

        <div className="catalog-container_filters_form_fieldset">
          <legend>Цена (руб.)</legend>
          <input type="number" data-filter="min_price" placeholder="От"/>
          <input type="number" data-filter="max_price" placeholder="До"/>
        </div>

        <div className="catalog-container_filters_form_fieldset">
          <legend>В наличии (шт)</legend>
          <input type="number" placeholder="От"/>
          <input type="number" placeholder="До"/>
        </div>

        <div className="catalog-container_filters_form_controls">
          <button>Применить</button>
          <button onClick={ e => resetFilters(e) }>Сбросить</button>
        </div>
      </form>
    </div>
  );
}
