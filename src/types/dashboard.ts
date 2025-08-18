export interface DashboardStats {
  success: boolean;
  data: {
    month: string;
    day: string;
    monthlyDashboard: {
      income: number;
      expenses: number;
      net: number;
    };
    dailyDashboard: {
      income: number;
      expenses: number;
      net: number;
    };
    monthlyCost: number;
    dailyCost: number;
    total: {
      total_income: number;
      total_expense: number;
      createdAt: string;
      updatedAt: string;
    };
  };
}
