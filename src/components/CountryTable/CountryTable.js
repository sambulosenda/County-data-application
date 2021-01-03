import { StylesProvider } from "@material-ui/core";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./CountryTable.module.css";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <> </>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading__arrow}>
        <KeyboardArrowDownRounded />
      </div>
    );
  } else {
    return (
      <div className={styles.heading__arrow}>
        <KeyboardArrowUpRounded />
      </div>
    );
  }
};

function CountryTable({ countries }) {
  const [direction, setdirection] = useState();
  const [value, setvalue] = useState();

  const orderedCountry = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setdirection("desc");
    } else if (direction == "desc") {
      setdirection("asc");
    } else {
      setdirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection()
    setvalue(value);
  }


  return (
    <div>
      <div className={styles.heading}>
        <button className={styles.heading_name} onClick={() =>setValueAndDirection('population')}>
          <div>Name</div>
          <SortArrow />
        </button>

        <button className={styles.heading_population} onClick={() =>setValueAndDirection('population')}>
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>
      </div>

      {orderedCountry.map((country) => (
        <Link href={`/country/${country.alpha3Code}`}>
        <div className={styles.row}>
          <div className={styles.name}>{country.name}</div>
          <div className={styles.population}>{country.population}</div>
        </div></Link>
      ))}
    </div>
  );
}

export default CountryTable;
