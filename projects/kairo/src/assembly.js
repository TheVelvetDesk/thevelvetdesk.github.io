const clamp = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (value) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

export const ingredientIds = ['broth', 'noodles', 'chashu', 'egg', 'garnish'];

export function layoutAssembly(progress, reducedMotion = false) {
  const stages = ingredientIds.map((id) => smoothstep(progress[id] ?? 0));
  const starts = [[0, 0], [-70, -130], [115, -80], [-120, 65], [100, 110]];
  return {
    raw: 1 - stages[0],
    steam: stages[4],
    ingredients: ingredientIds.map((id, index) => {
      const amount = stages[index];
      return {
        id,
        opacity: reducedMotion ? 1 : amount,
        x: reducedMotion ? 0 : starts[index][0] * (1 - amount),
        y: reducedMotion ? 0 : starts[index][1] * (1 - amount),
        scale: reducedMotion ? 1 : 0.88 + amount * 0.12,
      };
    }),
  };
}
