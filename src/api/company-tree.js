import request from "@/utils/request";

export function getCompanyTree() {
  return request({
    url: "/kong/maxguide-fleetmng/v1.0/companytree",
    method: "get"
  });
}
