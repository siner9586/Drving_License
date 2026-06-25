# 数据库设计

## 核心表说明

用户与区域：`User`、`Region`。  
基地供给：`School`、`TrainingBase`、`BaseDormitory`、`DormRoom`、`DormBed`、`Canteen`、`MealPlan`、`Coach`、`Vehicle`。  
交易服务：`CourseCategory`、`CampPackage`、`CampSession`、`Application`、`Order`、`OrderItem`、`Payment`。  
履约服务：`StudentCheckin`、`StudentStay`、`MealOrder`、`PickupService`、`CapacityCalendar`、`StudentProgress`、`ExamProgress`。  
售后与合规：`Review`、`Complaint`、`Refund`、`FranchiseApplication`、`FranchiseAudit`、`RiskEvent`、`AuditLog`。  
内容与规则：`Contract`、`PlatformRule`、`EnterpriseLead`、`Banner`、`Article`。

## 主要字段

`TrainingBase` 记录等级、省市、训练场面积、教练、车辆、床位、食堂容量、食宿接站能力、评分、投诉率和退款率。  
`CampPackage` 记录班型、价格、费用拆分、服务项、不包含项、退款规则和合规说明。  
`Order` 记录总价、已支付、订单状态、支付状态、报到状态和进度状态。

## 表关系

学校拥有多个基地；基地拥有宿舍、食堂、教练、车辆、班型、容量日历、订单、评价和投诉；班型拥有开班计划；订单关联用户、报名、基地、班型和多个子订单。

## 枚举说明

包含用户角色、基地等级、基地状态、订单状态、支付状态、报到状态、进度状态、投诉严重程度、退款状态、加盟审核状态、规则类型和风控等级。

## 后续扩展

可增加真实认证表、支付流水、发票、合同签署、文件上传、客服工单、商户多账号、结算分账和加盟评分表。
