const DEFAULT_TASK_STATUSES = [
    {
        name: "Todo",
        position: 1,
        isCompleted: false
    },
    {
        name: "In Progress",
        position: 2,
        isCompleted: false
    },
    {
        name: "Done",
        position: 3,
        isCompleted: false
    },
]

const DEFAULT_TASK_PRIORITIES = [
    {
        name: "Low",
        position: 1,
        color: "#22c55e"
    },
    {
        name: "Medium",
        position: 2,
        color: "#f59e0b"
    },
    {
        name: "High",
        position: 3,
        color: "#ef4444"
    },
]

module.exports = {
    DEFAULT_TASK_STATUSES,
    DEFAULT_TASK_PRIORITIES
}