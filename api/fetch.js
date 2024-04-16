const axios = require("axios");
const cheerio = require("cheerio");

async function fetchAndParse(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $("title").text();
    const attackerElement = $(
      "#attack_info_att > tbody > tr:nth-child(2) > td:nth-child(2) > span"
    );
    const defenderElement = $(
      "#attack_info_def > tbody > tr:nth-child(2) > td:nth-child(2) > span"
    );

    const parseUnitValue = (value) => {
      const parsedValue = parseInt(value.trim());
      return isNaN(parsedValue) ? null : parsedValue;
    };

    const attackInfo = {
      title,
      aggressor: attackerElement.text().trim(),
      attacker_id: attackerElement.attr("data-player"),
      att_village: attackerElement.attr("data-id"),
      defender: defenderElement.text().trim(),
      defender_id: defenderElement.attr("data-player"),
      def_village: defenderElement.attr("data-id"),
      attackingUnits: {
        spear: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-spear"
          ).text()
        ),
        sword: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-sword"
          ).text()
        ),
        axe: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-axe"
          ).text()
        ),
        spy: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-spy"
          ).text()
        ),
        light: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-light"
          ).text()
        ),
        heavy: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-heavy"
          ).text()
        ),
        ram: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-ram"
          ).text()
        ),
        catapult: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-catapult"
          ).text()
        ),
        snob: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-snob"
          ).text()
        ),
      },
      attackingUnitsDead: {
        spear: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-spear"
          ).text()
        ),
        sword: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-sword"
          ).text()
        ),
        axe: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-axe"
          ).text()
        ),
        spy: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-spy"
          ).text()
        ),
        light: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-light"
          ).text()
        ),
        heavy: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-heavy"
          ).text()
        ),
        ram: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-ram"
          ).text()
        ),
        catapult: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-catapult"
          ).text()
        ),
        snob: parseUnitValue(
          $(
            "#attack_info_att_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-snob"
          ).text()
        ),
      },
      defendingUnits: {
        spear: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-spear"
          ).text()
        ),
        sword: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-sword"
          ).text()
        ),
        axe: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-axe"
          ).text()
        ),
        spy: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-spy"
          ).text()
        ),
        light: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-light"
          ).text()
        ),
        heavy: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-heavy"
          ).text()
        ),
        ram: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-ram"
          ).text()
        ),
        catapult: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-catapult"
          ).text()
        ),
        snob: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(2) > td.unit-item.unit-item-snob"
          ).text()
        ),
      },
      defendingUnitsDead: {
        spear: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-spear"
          ).text()
        ),
        sword: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-sword"
          ).text()
        ),
        axe: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-axe"
          ).text()
        ),
        spy: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-spy"
          ).text()
        ),
        light: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-light"
          ).text()
        ),
        heavy: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-heavy"
          ).text()
        ),
        ram: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-ram"
          ).text()
        ),
        catapult: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-catapult"
          ).text()
        ),
        snob: parseUnitValue(
          $(
            "#attack_info_def_units > tbody > tr:nth-child(3) > td.unit-item.unit-item-snob"
          ).text()
        ),
      },
      buildings: {},
      unitsAway: {
        spear: parseUnitValue(
          $(
            "#attack_spy_away table.vis tbody tr:nth-child(2) td.unit-item.unit-item-spear"
          ).text()
        ),
        sword: parseUnitValue(
          $(
            "#attack_spy_away table.vis tbody tr:nth-child(2) td.unit-item.unit-item-sword"
          ).text()
        ),
        axe: parseUnitValue(
          $(
            "#attack_spy_away table.vis tbody tr:nth-child(2) td.unit-item.unit-item-axe"
          ).text()
        ),
        spy: parseUnitValue(
          $(
            "#attack_spy_away table.vis tbody tr:nth-child(2) td.unit-item.unit-item-spy"
          ).text()
        ),
        light: parseUnitValue(
          $(
            "#attack_spy_away table.vis tbody tr:nth-child(2) td.unit-item.unit-item-light"
          ).text()
        ),
        heavy: parseUnitValue(
          $(
            "#attack_spy_away table.vis tbody tr:nth-child(2) td.unit-item.unit-item-heavy"
          ).text()
        ),
        ram: parseUnitValue(
          $(
            "#attack_spy_away table.vis tbody tr:nth-child(2) td.unit-item.unit-item-ram"
          ).text()
        ),
        catapult: parseUnitValue(
          $(
            "#attack_spy_away table.vis tbody tr:nth-child(2) td.unit-item.unit-item-catapult"
          ).text()
        ),
        snob: parseUnitValue(
          $(
            "#attack_spy_away table.vis tbody tr:nth-child(2) td.unit-item.unit-item-snob"
          ).text()
        ),
      },
    };

    $(
      "#attack_spy_buildings_left tbody tr, #attack_spy_buildings_right tbody tr"
    ).each((index, element) => {
      const buildingName = $(element)
        .find("td:nth-child(1) span.middle")
        .text()
        .trim();
      const buildingLevel = parseInt(
        $(element).find("td:nth-child(2)").text().trim()
      );
      if (!isNaN(buildingLevel) && buildingName !== "") {
        attackInfo.buildings[buildingName] = buildingLevel;
      }
    });

    const attackDate = $(
      "#content_value > tbody > tr > td > table.no_spacing > tbody > tr > td:nth-child(2) > table > tbody > tr > td > h4:nth-child(2)"
    )
      .text()
      .trim();

    const supportLossElement = $(
      "#attack_results > tbody > tr:nth-child(2) > td"
    );
    const supportLossMatch = supportLossElement.text().trim().match(/(\d+)/g);

    const supportLoss = supportLossMatch ? supportLossMatch.map(Number) : null;

    console.log("Title:", title);
    console.log("Attack Date:", attackDate);
    console.log("Aggressor:", attackInfo.aggressor);
    console.log("Attacker ID:", attackInfo.attacker_id);
    console.log("Attacker Village:", attackInfo.att_village);
    console.log("Defender:", attackInfo.defender);
    console.log("Defender ID:", attackInfo.defender_id);
    console.log("Defender Village:", attackInfo.def_village);
    console.log("Attacking Units:", attackInfo.attackingUnits);
    console.log("Attacking Units Dead:", attackInfo.attackingUnitsDead);
    console.log("Defending Units:", attackInfo.defendingUnits);
    console.log("Defending Units Dead:", attackInfo.defendingUnitsDead);
    console.log("Units Away:", attackInfo.unitsAway);
    console.log("Buildings:", attackInfo.buildings);
    console.log("Support Loss:", supportLoss);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const url =
  "https://pl184.plemiona.pl/public_report/1c8083200fc5877c0809c6d21305daa8?village=27641";
fetchAndParse(url);
