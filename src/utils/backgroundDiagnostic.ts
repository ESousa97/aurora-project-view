// src/utils/backgroundDiagnostic.ts - Diagnóstico de background
export const diagnoseBackground = () => {
  console.log('🔍 DIAGNÓSTICO DE BACKGROUND');
  console.log('=====================================');
  
  // 1. Verificar background do body
  const bodyBg = window.getComputedStyle(document.body).backgroundColor;
  console.log('📱 Body background:', bodyBg);
  
  // 2. Verificar background do html
  const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
  console.log('🌐 HTML background:', htmlBg);
  
  // 3. Verificar background do #root
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const rootBg = window.getComputedStyle(rootElement).backgroundColor;
    console.log('🎯 Root background:', rootBg);
  }
  
  // 4. Verificar tema ativo
  const isDark = document.documentElement.classList.contains('dark');
  console.log('🌙 Tema escuro ativo:', isDark);
  
  // 5. Verificar classes de background no body
  const bodyClasses = Array.from(document.body.classList).filter(cls => 
    cls.includes('bg-') || cls.includes('background')
  );
  console.log('🎨 Classes de background no body:', bodyClasses);
  
  // 6. Verificar classes de background no html
  const htmlClasses = Array.from(document.documentElement.classList).filter(cls => 
    cls.includes('bg-') || cls.includes('background')
  );
  console.log('🎨 Classes de background no html:', htmlClasses);
  
  // 7. Verificar variáveis CSS
  const style = getComputedStyle(document.documentElement);
  const backgroundVar = style.getPropertyValue('--background');
  console.log('🔧 Variável --background:', backgroundVar);
  
  // 8. Verificar por gradientes amarelos
  const allElements = document.querySelectorAll('*');
  const yellowElements: Element[] = [];
  
  allElements.forEach(el => {
    const bgColor = window.getComputedStyle(el).backgroundColor;
    const bgImage = window.getComputedStyle(el).backgroundImage;
    
    if (bgColor.includes('255, 255') || bgColor.includes('255, 165') || 
        bgImage.includes('yellow') || bgImage.includes('orange')) {
      yellowElements.push(el);
    }
  });
  
  if (yellowElements.length > 0) {
    console.warn('⚠️ Elementos com background amarelo/laranja encontrados:', yellowElements);
  } else {
    console.log('✅ Nenhum elemento amarelo/laranja encontrado');
  }
  
  // 9. Testar cores esperadas
  const expectedLight = 'rgb(248, 250, 252)';
  const expectedDark = 'rgb(4, 13, 32)';
  const expected = isDark ? expectedDark : expectedLight;
  
  console.log('🎯 Cor esperada:', expected);
  console.log('🎯 Cor atual:', bodyBg);
  console.log('✅ Background correto:', bodyBg === expected);
  
  // 10. Verificar por CSS inline
  const bodyStyle = document.body.getAttribute('style');
  console.log('🔧 CSS inline no body:', bodyStyle);
  
  console.log('=====================================');
  
  return {
    bodyBg,
    htmlBg,
    isDark,
    bodyClasses,
    htmlClasses,
    backgroundVar,
    yellowElements: yellowElements.length,
    isCorrect: bodyBg === expected,
    expected,
    actual: bodyBg
  };
};

// Função para corrigir automaticamente
export const fixBackground = () => {
  console.log('🔧 CORRIGINDO BACKGROUND...');
  
  // Remove classes problemáticas
  const problematicClasses = [
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300',
    'bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300',
    'bg-amber-50', 'bg-amber-100', 'bg-amber-200', 'bg-amber-300'
  ];
  
  problematicClasses.forEach(className => {
    document.body.classList.remove(className);
    document.documentElement.classList.remove(className);
  });
  
  // Força background correto
  const isDark = document.documentElement.classList.contains('dark');
  const correctBg = isDark ? 'rgb(4, 13, 32)' : 'rgb(248, 250, 252)';
  const correctColor = isDark ? 'rgb(248, 250, 252)' : 'rgb(30, 41, 59)';
  
  document.body.style.setProperty('background-color', correctBg, 'important');
  document.body.style.setProperty('color', correctColor, 'important');
  
  // Remove atributos de background inválidos
  document.body.removeAttribute('bgcolor');
  document.documentElement.removeAttribute('bgcolor');
  
  console.log('✅ Background corrigido para:', correctBg);
  
  return diagnoseBackground();
};