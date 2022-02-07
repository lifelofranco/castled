import { SelectOptionDto } from "./../dtos/SelectOptionDto";
import { StringAnyMap } from "./types";
import _ from "lodash";
import { cpuUsage } from "process";

const getEnumSelectOptions = (titleMap: StringAnyMap) => {
  const options: SelectOptionDto[] = [];
  _.map(titleMap, (title, key) => {
    options.push({
      title,
      value: key,
    });
  });
  return options;
};

export default { getEnumSelectOptions };
