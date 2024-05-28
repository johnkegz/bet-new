export const getFilterChipName = (data, id) => {
    try {
        const result = data.find(item => item.id === id);
        return result.name
    } catch (e) {
        console.log(e)
        return ""
    }
}
