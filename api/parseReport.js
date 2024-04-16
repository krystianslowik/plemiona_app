const axios = require("axios");
const cheerio = require("cheerio");

const parseReport = async (world, reportId, res) => {
  const url = `https://${world}.plemiona.pl/public_report/${reportId}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const parseUnitValue = (value) => {
      const parsedValue = parseInt(value.trim());
      return isNaN(parsedValue) ? null : parsedValue;
    };

    const title = $("title").text();
    const attackerElement = $(
      "#attack_info_att > tbody > tr:nth-child(2) > td:nth-child(2) > span"
    );
    const defenderElement = $(
      "#attack_info_def > tbody > tr:nth-child(2) > td:nth-child(2) > span"
    );

    const attackInfo = {
      aggressor: attackerElement.text().trim(),
      aggressor_id: attackerElement.attr("data-player"),
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

    const result = {
      attackDate,
      attackInfo,
      supportLoss,
    };

    // Logging the parsed result for debugging
    console.log("Parsed Report:", result);

    res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while parsing the report" });
  }
};

module.exports = parseReport;
