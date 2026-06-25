import {
  ApplicationStatus,
  AuditStage,
  AuditStatus,
  CheckinStatus,
  ComplaintSeverity,
  ComplaintStatus,
  FranchiseStatus,
  LeadStatus,
  PackageStatus,
  PaymentStatus,
  PrismaClient,
  RefundStatus,
  ReviewStatus,
  RiskSourceType,
  RiskStatus,
  RuleType,
  SessionStatus,
  VehicleStatus
} from "@prisma/client";
import { getMockDataset } from "../lib/mock-data";

const prisma = new PrismaClient();

async function reset() {
  await prisma.auditLog.deleteMany();
  await prisma.article.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.enterpriseLead.deleteMany();
  await prisma.riskEvent.deleteMany();
  await prisma.platformRule.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.franchiseAudit.deleteMany();
  await prisma.franchiseApplication.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.review.deleteMany();
  await prisma.examProgress.deleteMany();
  await prisma.studentProgress.deleteMany();
  await prisma.capacityCalendar.deleteMany();
  await prisma.pickupService.deleteMany();
  await prisma.mealOrder.deleteMany();
  await prisma.studentStay.deleteMany();
  await prisma.studentCheckin.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.application.deleteMany();
  await prisma.campSession.deleteMany();
  await prisma.campPackage.deleteMany();
  await prisma.courseCategory.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.coach.deleteMany();
  await prisma.mealPlan.deleteMany();
  await prisma.canteen.deleteMany();
  await prisma.dormBed.deleteMany();
  await prisma.dormRoom.deleteMany();
  await prisma.baseDormitory.deleteMany();
  await prisma.trainingBase.deleteMany();
  await prisma.school.deleteMany();
  await prisma.region.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  const data = getMockDataset();
  await reset();

  await prisma.region.createMany({
    data: data.regions.map((region) => ({
      id: region.id,
      name: region.name,
      code: region.code,
      type: region.type,
      parentId: region.parentId || null
    }))
  });

  await prisma.user.createMany({
    data: data.orders.map((order, index) => ({
      id: order.userId,
      name: order.studentName,
      phone: `1381000${String(1000 + index)}`,
      email: `student${index + 1}@demo.local`,
      role: "STUDENT",
      province: data.bases[index % data.bases.length].province,
      city: data.bases[index % data.bases.length].city
    }))
  });

  await prisma.user.createMany({
    data: [
      { id: "user_admin_demo", name: "平台管理员", phone: "13990000001", email: "admin@demo.local", role: "ADMIN" },
      { id: "user_merchant_demo", name: "基地商户演示", phone: "13990000002", email: "merchant@demo.local", role: "MERCHANT" },
      { id: "user_operator_demo", name: "区域运营演示", phone: "13990000003", email: "operator@demo.local", role: "OPERATOR" }
    ]
  });

  for (const base of data.bases) {
    await prisma.school.create({
      data: {
        id: base.schoolId,
        name: `${base.name} 所属演示驾校`,
        licenseNo: `DEMO-LIC-${base.id}`,
        filingNo: `DEMO-FILE-${base.id}`,
        province: base.province,
        city: base.city,
        address: base.address,
        contactName: "演示负责人",
        contactPhone: "13900000000",
        status: "ACTIVE"
      }
    });

    await prisma.trainingBase.create({
      data: {
        id: base.id,
        schoolId: base.schoolId,
        name: base.name,
        slug: base.slug,
        level: base.level,
        province: base.province,
        city: base.city,
        address: base.address,
        summary: base.summary,
        description: base.description,
        coverImage: base.coverImage,
        verified: base.verified,
        status: base.status,
        trainingFieldArea: base.trainingFieldArea,
        coachCount: base.coachCount,
        vehicleCount: base.vehicleCount,
        totalBeds: base.totalBeds,
        availableBeds: base.availableBeds,
        canteenCapacity: base.canteenCapacity,
        dailyStudentCapacity: base.dailyStudentCapacity,
        monthlyStudentCapacity: base.monthlyStudentCapacity,
        supportsAccommodation: base.supportsAccommodation,
        supportsMeals: base.supportsMeals,
        supportsPickup: base.supportsPickup,
        supportsFemaleDorm: base.supportsFemaleDorm,
        supportsEnterpriseTraining: base.supportsEnterpriseTraining,
        rating: base.rating,
        complaintRate: base.complaintRate,
        refundRate: base.refundRate
      }
    });

    for (const dormitory of base.dormitories) {
      await prisma.baseDormitory.create({
        data: {
          id: dormitory.id,
          baseId: base.id,
          name: dormitory.name,
          description: dormitory.description,
          totalBeds: dormitory.totalBeds,
          availableBeds: dormitory.availableBeds,
          hasAirConditioning: dormitory.hasAirConditioning,
          hasPrivateBathroom: dormitory.hasPrivateBathroom,
          hasHotWater: dormitory.hasHotWater,
          hasLaundry: dormitory.hasLaundry,
          genderSeparated: dormitory.genderSeparated,
          hasAccessControl: dormitory.hasAccessControl,
          managerOnDuty: dormitory.managerOnDuty,
          pricePerDay: dormitory.pricePerDay,
          rules: dormitory.rules
        }
      });
      for (const room of dormitory.rooms) {
        await prisma.dormRoom.create({
          data: {
            id: room.id,
            dormitoryId: dormitory.id,
            roomType: room.roomType,
            capacity: room.capacity,
            totalRooms: room.totalRooms,
            availableRooms: room.availableRooms,
            pricePerDay: room.pricePerDay,
            features: room.features
          }
        });
        for (let bedIndex = 0; bedIndex < Math.min(4, room.capacity); bedIndex += 1) {
          await prisma.dormBed.create({
            data: {
              id: `${room.id}_bed_${bedIndex + 1}`,
              dormitoryId: dormitory.id,
              roomId: room.id,
              bedNo: `${room.roomType}-${bedIndex + 1}`,
              gender: bedIndex % 2 === 0 ? "FLEXIBLE" : "FEMALE",
              status: bedIndex === 0 ? "OCCUPIED" : "AVAILABLE"
            }
          });
        }
      }
    }

    for (const canteen of base.canteens) {
      await prisma.canteen.create({
        data: {
          id: canteen.id,
          baseId: base.id,
          name: canteen.name,
          description: canteen.description,
          dailyCapacity: canteen.dailyCapacity,
          mealCountPerDay: canteen.mealCountPerDay,
          supportsHalal: canteen.supportsHalal,
          supportsVegetarian: canteen.supportsVegetarian,
          supportsEnterpriseMeal: canteen.supportsEnterpriseMeal,
          foodSafetyNote: canteen.foodSafetyNote,
          complaintChannel: canteen.complaintChannel
        }
      });
      await prisma.mealPlan.createMany({
        data: canteen.mealPlans.map((plan) => ({
          id: plan.id,
          canteenId: canteen.id,
          name: plan.name,
          pricePerDay: plan.pricePerDay,
          meals: plan.meals,
          description: plan.description
        }))
      });
    }

    await prisma.coach.createMany({ data: base.coaches });
    await prisma.vehicle.createMany({
      data: base.vehicles.map((vehicle) => ({
        ...vehicle,
        status: vehicle.status as VehicleStatus
      }))
    });
    await prisma.capacityCalendar.createMany({
      data: base.capacityCalendar.map((day) => ({
        id: day.id,
        baseId: day.baseId,
        date: new Date(day.date),
        newStudentCapacity: day.newStudentCapacity,
        availableBeds: day.availableBeds,
        availableVehicles: day.availableVehicles,
        availableCoaches: day.availableCoaches,
        sessionSeats: day.sessionSeats,
        warningLevel: day.warningLevel
      }))
    });
  }

  const categoryRows = [
    ["category_C1", "C1", "C1 手动挡", "C1 车型集训服务"],
    ["category_C2", "C2", "C2 自动挡", "C2 车型集训服务"],
    ["category_D", "D", "摩托车 D", "摩托车 D 车型训练"],
    ["category_E", "E", "摩托车 E", "摩托车 E 车型训练"],
    ["category_B2", "B2", "B2 企业团训", "B2 企业司机培训"],
    ["category_A2", "A2", "A2 防御性驾驶", "A2 安全培训"]
  ] as const;
  await prisma.courseCategory.createMany({
    data: categoryRows.map(([id, code, name, description]) => ({ id, code, name, description }))
  });

  for (const pack of data.packages) {
    await prisma.campPackage.create({
      data: {
        id: pack.id,
        baseId: pack.baseId,
        categoryId: pack.categoryId,
        name: pack.name,
        slug: pack.slug,
        targetUsers: pack.targetUsers,
        description: pack.description,
        price: pack.price,
        trainingFee: pack.trainingFee,
        dormitoryFee: pack.dormitoryFee,
        mealFee: pack.mealFee,
        pickupFee: pack.pickupFee,
        examFeeNote: pack.examFeeNote,
        includesAccommodation: pack.includesAccommodation,
        includesMeals: pack.includesMeals,
        supportsPickup: pack.supportsPickup,
        durationText: pack.durationText,
        serviceItems: pack.serviceItems,
        notIncludedItems: pack.notIncludedItems,
        refundRule: pack.refundRule,
        complianceNote: pack.complianceNote,
        remainingSeats: pack.remainingSeats,
        status: pack.status as PackageStatus
      }
    });
    await prisma.campSession.createMany({
      data: pack.sessions.map((session) => ({
        id: session.id,
        packageId: session.packageId,
        baseId: session.baseId,
        startDate: new Date(session.startDate),
        endDate: new Date(session.endDate),
        capacity: session.capacity,
        remainingSeats: session.remainingSeats,
        status: session.status as SessionStatus
      }))
    });
  }

  await prisma.application.createMany({
    data: data.applications.map((application) => ({
      id: application.id,
      studentName: application.studentName,
      phone: application.phone,
      province: application.province,
      city: application.city,
      targetLicenseType: application.targetLicenseType,
      baseId: application.baseId || null,
      packageId: application.packageId || null,
      needAccommodation: application.needAccommodation,
      needMeals: application.needMeals,
      needPickup: application.needPickup,
      expectedArrivalDate: application.expectedArrivalDate ? new Date(application.expectedArrivalDate) : null,
      isEnterprise: application.isEnterprise,
      enterpriseName: application.enterpriseName || null,
      enterpriseSize: application.enterpriseSize || null,
      note: application.note || null,
      status: application.status as ApplicationStatus,
      riskFlag: application.riskFlag
    }))
  });

  for (const order of data.orders) {
    await prisma.order.create({
      data: {
        id: order.id,
        orderNo: order.orderNo,
        userId: order.userId,
        applicationId: data.applications.find((item) => item.baseId === order.baseId)?.id || null,
        baseId: order.baseId,
        packageId: order.packageId,
        totalAmount: order.totalAmount,
        paidAmount: order.paidAmount,
        status: order.status,
        paymentStatus: order.paymentStatus as PaymentStatus,
        checkinStatus: order.checkinStatus as CheckinStatus,
        progressStatus: order.progressStatus,
        items: {
          create: order.items.map((item) => ({
            type: item.type as "TRAINING" | "DORMITORY" | "MEAL" | "PICKUP" | "INSURANCE" | "SERVICE",
            name: item.name,
            amount: item.amount,
            description: item.description
          }))
        },
        payments: {
          create: order.paidAmount > 0 ? [{ provider: "MOCK", amount: order.paidAmount, status: "PAID", paidAt: new Date(order.createdAt) }] : []
        }
      }
    });
    await prisma.studentCheckin.create({
      data: {
        orderId: order.id,
        baseId: order.baseId,
        studentName: order.studentName,
        arrivalDate: new Date(order.createdAt),
        dormitoryAssigned: order.accommodation,
        mealPlanAssigned: order.meals,
        pickupRequired: order.pickup,
        status: order.checkinStatus as CheckinStatus,
        note: "演示报到记录"
      }
    });
    const base = data.bases.find((item) => item.id === order.baseId);
    const dormitory = base?.dormitories[0];
    const room = dormitory?.rooms[0];
    const mealPlan = base?.canteens[0]?.mealPlans[0];
    if (dormitory && room) {
      await prisma.studentStay.create({
        data: {
          orderId: order.id,
          dormitoryId: dormitory.id,
          roomId: room.id,
          bedId: `${room.id}_bed_1`,
          checkinDate: new Date(order.createdAt),
          status: order.accommodation ? "CHECKED_IN" : "RESERVED"
        }
      });
    }
    if (mealPlan) {
      await prisma.mealOrder.create({
        data: {
          orderId: order.id,
          mealPlanId: mealPlan.id,
          startDate: new Date(order.createdAt),
          status: order.meals ? "ACTIVE" : "PENDING"
        }
      });
    }
    if (order.pickup) {
      await prisma.pickupService.create({
        data: {
          orderId: order.id,
          pickupLocation: "演示高铁站",
          pickupTime: new Date(order.createdAt),
          price: 120,
          status: "PENDING",
          note: "按订单确认时间接站"
        }
      });
    }
    await prisma.contract.create({
      data: {
        orderId: order.id,
        type: "PLATFORM",
        title: "平台服务确认单",
        content: "演示合同内容，明确培训、住宿、餐饮、接站和售后服务边界。",
        signedAt: new Date(order.createdAt)
      }
    });
  }

  await prisma.studentProgress.createMany({
    data: data.progress.map((progress) => ({
      id: progress.id,
      orderId: progress.orderId,
      currentStage: progress.currentStage,
      theoryStatus: progress.theoryStatus,
      fieldTrainingStatus: progress.fieldTrainingStatus,
      roadTrainingStatus: progress.roadTrainingStatus,
      examBookingNote: progress.examBookingNote,
      nextStep: progress.nextStep,
      teacherNote: progress.teacherNote,
      managerNote: progress.managerNote,
      updatedBy: progress.updatedBy
    }))
  });

  await prisma.examProgress.createMany({
    data: data.orders.slice(0, 20).map((order, index) => ({
      orderId: order.id,
      subject: index % 2 === 0 ? "科目一" : "科目二",
      status: index % 4 === 0 ? "待预约" : "训练准备",
      bookingDate: new Date(order.createdAt),
      resultNote: "仅记录预约和结果备注，不承诺考试结果。"
    }))
  });

  await prisma.review.createMany({
    data: data.reviews.map((review) => ({
      id: review.id,
      orderId: review.orderId,
      baseId: review.baseId,
      userId: review.userId,
      rating: review.rating,
      content: review.content,
      tags: review.tags,
      status: review.status as ReviewStatus
    }))
  });

  await prisma.complaint.createMany({
    data: data.complaints.map((complaint) => ({
      id: complaint.id,
      orderId: complaint.orderId,
      baseId: complaint.baseId,
      type: complaint.type,
      severity: complaint.severity as ComplaintSeverity,
      content: complaint.content,
      status: complaint.status as ComplaintStatus,
      resolution: complaint.resolution
    }))
  });

  await prisma.refund.createMany({
    data: data.refunds.map((refund) => ({
      id: refund.id,
      orderId: refund.orderId,
      reason: refund.reason,
      requestedAmount: refund.requestedAmount,
      approvedAmount: refund.approvedAmount,
      status: refund.status as RefundStatus,
      note: refund.note
    }))
  });

  await prisma.franchiseApplication.createMany({
    data: data.franchiseApplications.map((item) => ({
      id: item.id,
      schoolName: item.schoolName,
      province: item.province,
      city: item.city,
      licenseNo: item.licenseNo,
      filingNo: item.filingNo,
      trainingFieldAddress: item.trainingFieldAddress,
      trainingFieldArea: item.trainingFieldArea,
      coachCount: item.coachCount,
      vehicleCount: item.vehicleCount,
      licenseTypes: item.licenseTypes,
      hasDormitory: item.hasDormitory,
      bedCount: item.bedCount,
      hasCanteen: item.hasCanteen,
      canteenCapacity: item.canteenCapacity,
      supportsPickup: item.supportsPickup,
      supportsFemaleDorm: item.supportsFemaleDorm,
      safetyDescription: item.safetyDescription,
      foodSafetyDescription: item.foodSafetyDescription,
      priceDescription: item.priceDescription,
      contractDescription: item.contractDescription,
      refundDescription: item.refundDescription,
      canServeNationalStudents: item.canServeNationalStudents,
      contactName: item.contactName,
      contactPhone: item.contactPhone,
      status: item.status as FranchiseStatus,
      riskFlag: item.riskFlag
    }))
  });

  await prisma.franchiseAudit.createMany({
    data: data.franchiseAudits.map((audit) => ({
      ...audit,
      stage: audit.stage as AuditStage,
      status: audit.status as AuditStatus
    }))
  });
  await prisma.enterpriseLead.createMany({
    data: data.enterpriseLeads.map((lead) => ({
      id: lead.id,
      companyName: lead.companyName,
      contactName: lead.contactName,
      phone: lead.phone,
      province: lead.province,
      city: lead.city,
      studentCount: lead.studentCount,
      targetLicenseType: lead.targetLicenseType,
      needAccommodation: lead.needAccommodation,
      needMeals: lead.needMeals,
      expectedTrainingDate: new Date(lead.expectedTrainingDate),
      note: lead.note,
      status: lead.status as LeadStatus
    }))
  });
  await prisma.riskEvent.createMany({
    data: data.riskEvents.map((event) => ({
      ...event,
      sourceType: event.sourceType as RiskSourceType,
      status: event.status as RiskStatus,
      createdAt: new Date(event.createdAt)
    }))
  });
  await prisma.platformRule.createMany({
    data: data.rules.map((rule) => ({
      id: rule.id,
      type: rule.type as RuleType,
      title: rule.title,
      content: rule.content,
      version: rule.version,
      published: rule.published,
      updatedAt: new Date(rule.updatedAt)
    }))
  });

  await prisma.banner.createMany({
    data: [
      {
        title: "全国驾培集训基地",
        subtitle: "吃住练一体化安排",
        image: data.bases[0].coverImage,
        link: "/bases",
        position: "home-hero",
        enabled: true
      },
      {
        title: "企业司机团训",
        subtitle: "集中排班与食宿支持",
        image: data.bases[1].coverImage,
        link: "/enterprise",
        position: "home-secondary",
        enabled: true
      }
    ]
  });
  await prisma.article.createMany({
    data: [
      {
        title: "平台合规服务边界",
        slug: "compliance-boundary",
        category: "compliance",
        summary: "说明平台服务范围和禁止事项。",
        content: "平台提供培训、住宿、餐饮、报到、进度跟踪和售后保障服务。",
        published: true
      },
      {
        title: "加盟基地审核标准",
        slug: "franchise-audit-standard",
        category: "franchise",
        summary: "说明加盟审核的主要维度。",
        content: "主体资质、备案、训练场、教练、车辆、宿舍、食堂和安全管理均需审核。",
        published: true
      }
    ]
  });
  await prisma.auditLog.createMany({
    data: [
      {
        actorId: "user_admin_demo",
        actorRole: "ADMIN",
        action: "seed:demo",
        targetType: "database",
        targetId: "demo",
        detail: "初始化平台 demo 数据"
      },
      {
        actorId: "user_operator_demo",
        actorRole: "OPERATOR",
        action: "review:franchise",
        targetType: "FranchiseApplication",
        targetId: data.franchiseApplications[0].id,
        detail: "区域初审演示记录"
      }
    ]
  });

  console.log("Seed complete", {
    regions: data.regions.length,
    bases: data.bases.length,
    packages: data.packages.length,
    coaches: data.bases.flatMap((base) => base.coaches).length,
    vehicles: data.bases.flatMap((base) => base.vehicles).length,
    applications: data.applications.length,
    orders: data.orders.length,
    progress: data.progress.length,
    complaints: data.complaints.length,
    refunds: data.refunds.length,
    reviews: data.reviews.length,
    franchiseApplications: data.franchiseApplications.length,
    enterpriseLeads: data.enterpriseLeads.length,
    riskEvents: data.riskEvents.length
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
