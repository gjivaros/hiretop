import { createStandaloneToast } from "@chakra-ui/react";
import {
  listVal,
  nbVal,
  strVal,
  strValOrUndef,
} from "@paroi/data-formatters-lib";
import { http } from "../http-module/http-module";
import { Account } from "../store/account-slice";
import { Application, Mission, MissionStatus } from "../store/mission-slice";
import { formatDate } from "./date-formater";

const { toast } = createStandaloneToast();

export async function findAllMission(status?: MissionStatus) {
  try {
    const url = status ? `missions?status=${status}` : "missions";
    const { data } = await http.get(url);

    return listVal(data, formatMission);
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

export async function findOneMission(id: string) {
  try {
    const { data } = await http.get(`/missions/${id}`);
    return formatMission(data);
  } catch (error) {
    console.log("find one mission", error);
  }
}

export async function applyMission(
  mission: Mission,
  refresh: () => Promise<void>,
  account: Account
) {
  try {
    const alreadyPostulate = mission.applications.find(
      (item) => item.applicantId === account?.id
    );

    if (alreadyPostulate) {
      return toast({
        title: "You have already applied for this mission",
        status: "info",
        isClosable: true,
      });
    }
    await http.post("/missions/postulate", { missionId: mission.id });

    toast({
      title: "Applied successfully",
      description:
        "You have a pending mission. The company will contact you as soon as possible. We wish you good luck.",
      status: "success",
      isClosable: true,
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "An error has occurred",
      description: "Please try again later",
      status: "error",
      isClosable: true,
    });
  }

  await refresh();
}

function formatMission(data: any): Mission {
  return {
    id: strVal(data.id),
    name: strVal(data.name),
    description: strVal(data.description),
    status: strVal(data.status) as MissionStatus,
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
    createdAt: formatDate({
      format: "MMMM D, YYYY",
      date: strVal(data.createdAt),
    }),
    updatedAt: formatDate({
      format: "MMMM D, YYYY",
      date: strVal(data.updatedAt),
    }),
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
    createdAt: formatDate({
      format: "MMMM D, YYYY",
      date: strVal(data.createdAt),
    }),
    updatedAt: formatDate({
      format: "MMMM D, YYYY",
      date: strVal(data.updatedAt),
    }),
  };
}
