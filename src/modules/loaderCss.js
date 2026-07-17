// Crear un plugin de Vite

export default (rawStyles) => {
  const styles = new CSSStyleSheet();
  styles.replaceSync(rawStyles);
  return styles;
};
