const BudgetCard = ({ budget }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/20">
      <h3 className="text-xl font-semibold text-white">Budget Summary</h3>
      <div className="mt-5 space-y-3 text-slate-400">
        <div className="flex justify-between text-sm sm:text-base">
          <span>Transport</span>
          <span>₹{budget.transport}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span>Food</span>
          <span>₹{budget.food}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span>Entry Fees</span>
          <span>₹{budget.entryFees}</span>
        </div>
        <div className="mt-4 flex justify-between border-t border-slate-800 pt-4 text-base font-semibold text-white">
          <span>Total</span>
          <span>₹{budget.total}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
