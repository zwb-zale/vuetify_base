import request from "@/utils/request";

export function getCompanyTree() {
  return request({
    url: "/kong/companymng/v1.0/companytree",
    method: "get"
  });
}
