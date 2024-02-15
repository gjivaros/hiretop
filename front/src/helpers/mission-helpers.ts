import {
  listVal,
  nbVal,
  strVal,
  strValOrUndef,
} from "@paroi/data-formatters-lib";
import { http } from "../http-module/http-module";
import { Application, Mission } from "../store/mission-slice";

export async function findAllMission(status?: string) {
  try {
    const url = status ? `missions?status=${status}` : "missions";
    const { data } = await http.get(url);

    return listVal(data, formatMission);
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

function formatMission(data: any): Mission {
  return {
    id: strVal(data.id),
    name: strVal(data.name),
    description: strVal(data.description),
    status: strVal(data.status),
    enterpriseId: strVal(data.enterpriseId),
    enterprise: {
      id: strVal(data.enterprise.id),
      name: strVal(data.enterprise.name),
      description: strVal(data.enterprise.description),
    },
    salary: {
      currency: strVal(data.salary.currency),
      max: nbVal(data.salary.max),
      min: nbVal(data.salary.min),
      type: strVal(data.salary.type),
    },
    createdAt: strVal(data.createdAt),
    updatedAt: strVal(data.updatedAt),
    localisation: strValOrUndef(data.localisation),
    applications: listVal(data.applications, formatApplication),
  };
}

function formatApplication(data: any): Application {
  return {
    id: strVal(data.id),
    applicantId: strVal(data.applicantId),
    missionId: strVal(data.missionId),
    status: strVal(data.status),
    createdAt: strVal(data.createdAt),
    updatedAt: strVal(data.updatedAt),
  };
}
