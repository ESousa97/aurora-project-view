// src/utils/sidebarDiagnostic.ts - Diagnóstico específico da sidebar
export const diagnoseSidebar = () => {
  console.log('🔍 DIAGNÓSTICO DA SIDEBAR');
  console.log('=====================================');
  
  // 1. Verificar se a sidebar existe
  const sidebarElement = document.querySelector('aside');
  if (!sidebarElement) {
    console.log('❌ Sidebar não encontrada');
    return;
  }
  
  console.log('✅ Sidebar encontrada');
  
  // 2. Verificar background da sidebar
  const sidebarBg = window.getComputedStyle(sidebarElement).backgroundColor;
  console.log('🎨 Background da sidebar:', sidebarBg);
  
  // 3. Verificar classes da sidebar
  const sidebarClasses = Array.from(sidebarElement.classList);
  console.log('📋 Classes da sidebar:', sidebarClasses);
  
  // 4. Verificar variáveis CSS da sidebar
  const style = getComputedStyle(document.documentElement);
  const sidebarVars = {
    background: style.getPropertyValue('--sidebar-background'),
    foreground: style.getPropertyValue('--sidebar-foreground'),
    border: style.getPropertyValue('--sidebar-border'),
    primary: style.getPropertyValue('--sidebar-primary'),
    accent: style.getPropertyValue('--sidebar-accent'),
  };
  console.log('🔧 Variáveis CSS da sidebar:', sidebarVars);
  
  // 5. Verificar categorias com cores amarelas/laranja
  const categoryButtons = sidebarElement.querySelectorAll('button');
  const problematicCategories: Element[] = [];
  
  categoryButtons.forEach((button) => {
    const hashIcon = button.querySelector('[style*="color"]');
    const bgElement = button.querySelector('[style*="background"]');
    
    if (hashIcon) {
      const color = hashIcon.getAttribute('style');
      if (color && (color.includes('#F7DF1E') || color.includes('#FFCA28') || color.includes('yellow') || color.includes('orange'))) {
        problematicCategories.push(button);
      }
    }
    
    if (bgElement) {
      const bgColor = bgElement.getAttribute('style');
      if (bgColor && (bgColor.includes('#F7DF1E') || bgColor.includes('#FFCA28') || bgColor.includes('yellow') || bgColor.includes('orange'))) {
        problematicCategories.push(button);
      }
    }
  });
  
  if (problematicCategories.length > 0) {
    console.warn('⚠️ Categorias com cores problemáticas:', problematicCategories);
    problematicCategories.forEach((cat, i) => {
      const text = cat.textContent?.trim();
      console.warn(`   ${i + 1}. ${text}`);
    });
  } else {
    console.log('✅ Nenhuma categoria com cor problemática encontrada');
  }
  
  // 6. Verificar botões de navegação
  const navButtons = sidebarElement.querySelectorAll('nav button');
  const problematicNavButtons: Element[] = [];
  
  navButtons.forEach((button) => {
    const style = button.getAttribute('style');
    const classes = Array.from(button.classList).join(' ');
    
    if (style && (style.includes('yellow') || style.includes('orange') || style.includes('#F7DF1E') || style.includes('#FFCA28'))) {
      problematicNavButtons.push(button);
    }
    
    if (classes.includes('yellow') || classes.includes('orange') || classes.includes('amber')) {
      problematicNavButtons.push(button);
    }
  });
  
  if (problematicNavButtons.length > 0) {
    console.warn('⚠️ Botões de navegação com cores problemáticas:', problematicNavButtons);
  } else {
    console.log('✅ Navegação com cores seguras');
  }
  
  // 7. Verificar logo
  const logo = sidebarElement.querySelector('a[href="/"]');
  if (logo) {
    const logoIcon = logo.querySelector('div');
    const logoText = logo.querySelector('span');
    
    if (logoIcon) {
      const iconStyle = logoIcon.getAttribute('style');
      const iconClasses = Array.from(logoIcon.classList).join(' ');
      console.log('🚀 Logo ícone style:', iconStyle);
      console.log('🚀 Logo ícone classes:', iconClasses);
    }
    
    if (logoText) {
      const textStyle = logoText.getAttribute('style');
      const textClasses = Array.from(logoText.classList).join(' ');
      console.log('📝 Logo texto style:', textStyle);
      console.log('📝 Logo texto classes:', textClasses);
    }
  }
  
  // 8. Resumo
  const isDark = document.documentElement.classList.contains('dark');
  const expectedSidebarBg = isDark ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)';
  
  console.log('🎯 Background esperado:', expectedSidebarBg);
  console.log('🎯 Background atual:', sidebarBg);
  console.log('✅ Sidebar correta:', sidebarBg === expectedSidebarBg);
  
  console.log('=====================================');
  
  return {
    sidebarExists: !!sidebarElement,
    sidebarBg,
    sidebarClasses,
    sidebarVars,
    problematicCategories: problematicCategories.length,
    problematicNavButtons: problematicNavButtons.length,
    isCorrect: sidebarBg === expectedSidebarBg,
    expected: expectedSidebarBg,
    actual: sidebarBg
  };
};

// Função para corrigir sidebar automaticamente
export const fixSidebar = () => {
  console.log('🔧 CORRIGINDO SIDEBAR...');
  
  const sidebarElement = document.querySelector('aside');
  if (!sidebarElement) {
    console.log('❌ Sidebar não encontrada');
    return;
  }
  
  // Force correct sidebar background
  const isDark = document.documentElement.classList.contains('dark');
  const correctBg = isDark ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)';
  const correctColor = isDark ? 'rgb(248, 250, 252)' : 'rgb(30, 41, 59)';
  
  sidebarElement.style.setProperty('background-color', correctBg, 'important');
  sidebarElement.style.setProperty('color', correctColor, 'important');
  
  // Fix category colors
  const categoryButtons = sidebarElement.querySelectorAll('button');
  categoryButtons.forEach((button) => {
    const hashIcons = button.querySelectorAll('[style*="color"]');
    const bgElements = button.querySelectorAll('[style*="background"]');
    
    hashIcons.forEach((icon) => {
      const currentStyle = icon.getAttribute('style') || '';
      if (currentStyle.includes('#F7DF1E') || currentStyle.includes('#FFCA28')) {
        // Replace with safe blue
        const newStyle = currentStyle.replace(/#F7DF1E|#FFCA28/g, '#3B82F6');
        icon.setAttribute('style', newStyle);
      }
    });
    
    bgElements.forEach((bg) => {
      const currentStyle = bg.getAttribute('style') || '';
      if (currentStyle.includes('#F7DF1E') || currentStyle.includes('#FFCA28')) {
        // Replace with safe blue
        const newStyle = currentStyle.replace(/#F7DF1E|#FFCA28/g, '#3B82F6');
        bg.setAttribute('style', newStyle);
      }
    });
  });
  
  console.log('✅ Sidebar corrigida');
  
  return diagnoseSidebar();
};
