'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import './design-system.css';

export default function DesignSystemPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Color Palette Data
  const colorPalette = {
    primary: [
      { name: 'Green', hex: '#00DD68', description: 'Primary brand color' },
    ],
    secondary: [
      { name: 'Orange', hex: '#FF9900', description: 'Secondary accent' },
      { name: 'Rich Orange', hex: '#FF5400', description: 'Secondary accent variant' },
      { name: 'Pink', hex: '#FF61F0', description: 'Secondary accent' },
      { name: 'Magenta', hex: '#FC0080', description: 'Secondary accent' },
    ],
    neutrals: [
      { name: 'Black', hex: '#080808', description: 'Primary text color' },
      { name: 'Light Gray', hex: '#F0F3F4', description: 'Background variant' },
      { name: 'White', hex: '#FFFFFF', description: 'Background and text on dark' },
    ],
    lightTints: [
      { hex: '#EAFFEA' },
      { hex: '#B1FFBE' },
      { hex: '#00FD92' },
      { hex: '#FFD798' },
      { hex: '#FFCC80' },
      { hex: '#FFE9DE' },
      { hex: '#FFB2BC' },
      { hex: '#FFEFFD' },
      { hex: '#FFBBFB' },
      { hex: '#FFF5F2' },
      { hex: '#FE8CC6' },
    ],
    darkTints: [
      { hex: '#009E60' },
      { hex: '#007740' },
      { hex: '#004540' },
      { hex: '#092207' },
      { hex: '#830076' },
      { hex: '#E07400' },
      { hex: '#C23A00' },
      { hex: '#880147' },
    ],
    gradients: [
      { name: 'Primary Green Gradient', top: '#00DD68', bottom: '#00FD92', label: 'Green Tint' },
      { name: 'Primary Green Gradient (Shade)', top: '#00DD68', bottom: '#009E60', label: 'Green Shade' },
      { name: 'Orange Gradient', top: '#FF9900', bottom: '#FF5400', label: 'Rich Orange' },
      { name: 'Rich Orange to Magenta', top: '#FF5400', bottom: '#FC0080', label: 'Magenta' },
      { name: 'Pink to Magenta', top: '#FF61F0', bottom: '#FC0080', label: 'Magenta' },
    ],
  };

  return (
    <div className="ds-page">
      <section className="ds-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="ds-title">Cohesity Design System - 2025</h1>
          
          {/* Color Palette Section */}
          <section className="ds-color-section">
            <h2 className="ds-section-title">Color Palette</h2>
            
            {/* Primary Colors */}
            <div className="ds-color-group">
              <h3 className="ds-group-title">Primary Colors</h3>
              <div className="ds-color-grid">
                {colorPalette.primary.map((color) => (
                  <div key={color.name} className="ds-color-card">
                    <div
                      className="ds-color-swatch"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, color.name)}
                    >
                      {copiedColor === color.name && (
                        <span className="ds-copied-badge">Copied!</span>
                      )}
                    </div>
                    <div className="ds-color-info">
                      <p className="ds-color-name">{color.name}</p>
                      <p className="ds-color-hex" onClick={() => copyToClipboard(color.hex, color.name)}>
                        {color.hex}
                      </p>
                      <p className="ds-color-desc">{color.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="ds-color-group">
              <h3 className="ds-group-title">Secondary Colors</h3>
              <div className="ds-color-grid">
                {colorPalette.secondary.map((color) => (
                  <div key={color.name} className="ds-color-card">
                    <div
                      className="ds-color-swatch"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, color.name)}
                    >
                      {copiedColor === color.name && (
                        <span className="ds-copied-badge">Copied!</span>
                      )}
                    </div>
                    <div className="ds-color-info">
                      <p className="ds-color-name">{color.name}</p>
                      <p className="ds-color-hex" onClick={() => copyToClipboard(color.hex, color.name)}>
                        {color.hex}
                      </p>
                      <p className="ds-color-desc">{color.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutrals */}
            <div className="ds-color-group">
              <h3 className="ds-group-title">Neutrals</h3>
              <div className="ds-color-grid">
                {colorPalette.neutrals.map((color) => (
                  <div key={color.name} className="ds-color-card">
                    <div
                      className="ds-color-swatch"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, color.name)}
                    >
                      {copiedColor === color.name && (
                        <span className="ds-copied-badge">Copied!</span>
                      )}
                    </div>
                    <div className="ds-color-info">
                      <p className="ds-color-name">{color.name}</p>
                      <p className="ds-color-hex" onClick={() => copyToClipboard(color.hex, color.name)}>
                        {color.hex}
                      </p>
                      <p className="ds-color-desc">{color.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Light Tints */}
            <div className="ds-color-group">
              <h3 className="ds-group-title">Light Tints</h3>
              <div className="ds-color-grid ds-color-grid-tints">
                {colorPalette.lightTints.map((color, index) => (
                  <div key={index} className="ds-color-card ds-color-card-small">
                    <div
                      className="ds-color-swatch"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, `light-tint-${index}`)}
                    >
                      {copiedColor === `light-tint-${index}` && (
                        <span className="ds-copied-badge">Copied!</span>
                      )}
                    </div>
                    <p className="ds-color-hex-small" onClick={() => copyToClipboard(color.hex, `light-tint-${index}`)}>
                      {color.hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Tints */}
            <div className="ds-color-group">
              <h3 className="ds-group-title">Dark Tints</h3>
              <div className="ds-color-grid ds-color-grid-tints">
                {colorPalette.darkTints.map((color, index) => (
                  <div key={index} className="ds-color-card ds-color-card-small">
                    <div
                      className="ds-color-swatch"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, `dark-tint-${index}`)}
                    >
                      {copiedColor === `dark-tint-${index}` && (
                        <span className="ds-copied-badge">Copied!</span>
                      )}
                    </div>
                    <p className="ds-color-hex-small" onClick={() => copyToClipboard(color.hex, `dark-tint-${index}`)}>
                      {color.hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradients */}
            <div className="ds-color-group">
              <h3 className="ds-group-title">Gradients</h3>
              <div className="ds-gradient-grid">
                {colorPalette.gradients.map((gradient) => (
                  <div key={gradient.name} className="ds-gradient-card">
                    <div
                      className="ds-gradient-swatch"
                      style={{
                        background: `linear-gradient(to bottom, ${gradient.top}, ${gradient.bottom})`,
                      }}
                    />
                    <div className="ds-gradient-info">
                      <p className="ds-gradient-name">{gradient.name}</p>
                      <div className="ds-gradient-colors">
                        <span>{gradient.top}</span>
                        <span>→</span>
                        <span>{gradient.bottom}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Button Components Section */}
          <section className="ds-button-section">
            <h2 className="ds-section-title">Button Components</h2>
            <p className="ds-section-description">
              Interactive button components with Active and Hover states across different breakpoints.
              Exception: buttons in main nav and sub-nav have their own style.
            </p>

            {/* Button Component Examples */}
            <div className="ds-button-showcase">
              {/* Primary Green Button */}
              <div className="ds-button-group">
                <div className="ds-button-header">
                  <h3 className="ds-button-title">PRIMARY GREEN</h3>
                  <p className="ds-button-desc">main green CTA (high emphasis) the main action on a page</p>
                </div>
                <div className="ds-button-states">
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active</p>
                    <button className="ds-btn ds-btn-primary-green">THIS IS A BUTTON</button>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover</p>
                    <button className="ds-btn ds-btn-primary-green ds-btn-hover">THIS IS A BUTTON</button>
                  </div>
                </div>
                <div className="ds-button-variants">
                  <p className="ds-variant-label">Variants</p>
                  <div className="ds-variant-grid">
                    <button className="ds-btn ds-btn-primary-green">THIS IS A BUTTON</button>
                    <button className="ds-btn ds-btn-primary-green">THIS IS A BUTTON</button>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-primary-green-light">LOREM IPSUM</button>
                    </div>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-primary-green-light">LOREM IPSUM</button>
                    </div>
                  </div>
                </div>
                {/* Documentation */}
                <div className="ds-button-docs">
                  <h4 className="ds-docs-heading">CSS Specifications</h4>
                  <div className="ds-docs-grid">
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Base Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>display: inline-flex</code></li>
                        <li><code>align-items: center</code></li>
                        <li><code>justify-content: center</code></li>
                        <li><code>padding: 18px 32px</code></li>
                        <li><code>border: 1.5px solid</code></li>
                        <li><code>border-radius: 6px</code></li>
                        <li><code>font-family: system-ui, -apple-system, sans-serif</code></li>
                        <li><code>font-size: 1rem</code></li>
                        <li><code>font-weight: 700</code></li>
                        <li><code>text-transform: uppercase</code></li>
                        <li><code>letter-spacing: 0.5px</code></li>
                        <li><code>transition: all 0.3s ease-in-out</code></li>
                        <li><code>cursor: pointer</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: #00DD68</code></li>
                        <li><code>color: #080808</code></li>
                        <li><code>border-color: #006616</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: #00774C</code></li>
                        <li><code>color: #FFFFFF</code></li>
                        <li><code>border-color: #080808</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Focus State</h5>
                      <ul className="ds-docs-list">
                        <li><code>outline: 2px solid #00FD92</code></li>
                        <li><code>outline-offset: 2px</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active (Click) State</h5>
                      <ul className="ds-docs-list">
                        <li><code>transform: scale(0.98)</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Disabled State</h5>
                      <ul className="ds-docs-list">
                        <li><code>opacity: 0.5</code></li>
                        <li><code>cursor: not-allowed</code></li>
                        <li><code>pointer-events: none</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Ghost-Green Button */}
              <div className="ds-button-group">
                <div className="ds-button-header">
                  <h3 className="ds-button-title">SECONDARY GHOST-GREEN BUTTON</h3>
                  <p className="ds-button-desc">white or black text for light and dark backgrounds (medium emphasis) a less important action</p>
                </div>
                <div className="ds-button-states">
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active (on dark)</p>
                    <div className="ds-bg-dark">
                      <button className="ds-btn ds-btn-ghost-green ds-btn-ghost-green-dark">LOREM IPSUM</button>
                    </div>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover (on dark)</p>
                    <div className="ds-bg-dark">
                      <button className="ds-btn ds-btn-ghost-green ds-btn-ghost-green-dark ds-btn-hover">LOREM IPSUM</button>
                    </div>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active (on light)</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-ghost-green">LOREM IPSUM</button>
                    </div>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover (on light)</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-ghost-green ds-btn-hover">LOREM IPSUM</button>
                    </div>
                  </div>
                </div>
                <div className="ds-button-variants">
                  <p className="ds-variant-label">Variants</p>
                  <div className="ds-variant-grid">
                    <div className="ds-bg-dark">
                      <button className="ds-btn ds-btn-ghost-green ds-btn-ghost-green-dark">LOREM IPSUM</button>
                    </div>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-ghost-green">LOREM IPSUM</button>
                    </div>
                  </div>
                </div>
                {/* Documentation */}
                <div className="ds-button-docs">
                  <h4 className="ds-docs-heading">CSS Specifications</h4>
                  <div className="ds-docs-grid">
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Base Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>display: inline-flex</code></li>
                        <li><code>align-items: center</code></li>
                        <li><code>justify-content: center</code></li>
                        <li><code>padding: 18px 32px</code></li>
                        <li><code>border: 1.5px solid</code></li>
                        <li><code>border-radius: 6px</code></li>
                        <li><code>font-family: system-ui, -apple-system, sans-serif</code></li>
                        <li><code>font-size: 1rem</code></li>
                        <li><code>font-weight: 700</code></li>
                        <li><code>text-transform: uppercase</code></li>
                        <li><code>letter-spacing: 0.5px</code></li>
                        <li><code>transition: all 0.3s ease-in-out</code></li>
                        <li><code>cursor: pointer</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State (on light background)</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #00DD68</code></li>
                        <li><code>border-color: #00DD68</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State (on light background)</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: #EAFFEA</code></li>
                        <li><code>color: #00DD68</code></li>
                        <li><code>border-color: #00DD68</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State (on dark background)</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #FFFFFF</code></li>
                        <li><code>border-color: #00DD68</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State (on dark background)</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: rgba(0, 221, 104, 0.1)</code></li>
                        <li><code>color: #FFFFFF</code></li>
                        <li><code>border-color: #00DD68</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Black Button */}
              <div className="ds-button-group">
                <div className="ds-button-header">
                  <h3 className="ds-button-title">PRIMARY BLACK</h3>
                  <p className="ds-button-desc">main black CTA</p>
                </div>
                <div className="ds-button-states">
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active</p>
                    <button className="ds-btn ds-btn-primary-black">THIS IS A BUTTON</button>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover</p>
                    <button className="ds-btn ds-btn-primary-black ds-btn-hover">THIS IS A BUTTON</button>
                  </div>
                </div>
                <div className="ds-button-variants">
                  <p className="ds-variant-label">Variants</p>
                  <div className="ds-variant-grid">
                    <button className="ds-btn ds-btn-primary-black">THIS IS A BUTTON</button>
                    <button className="ds-btn ds-btn-primary-black">THIS IS A BUTTON</button>
                    <button className="ds-btn ds-btn-primary-black">THIS IS A BUTTON</button>
                    <button className="ds-btn ds-btn-primary-black">THIS IS A BUTTON</button>
                  </div>
                </div>
                {/* Documentation */}
                <div className="ds-button-docs">
                  <h4 className="ds-docs-heading">CSS Specifications</h4>
                  <div className="ds-docs-grid">
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Base Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>display: inline-flex</code></li>
                        <li><code>align-items: center</code></li>
                        <li><code>justify-content: center</code></li>
                        <li><code>padding: 18px 32px</code></li>
                        <li><code>border: 1.5px solid</code></li>
                        <li><code>border-radius: 6px</code></li>
                        <li><code>font-family: system-ui, -apple-system, sans-serif</code></li>
                        <li><code>font-size: 1rem</code></li>
                        <li><code>font-weight: 700</code></li>
                        <li><code>text-transform: uppercase</code></li>
                        <li><code>letter-spacing: 0.5px</code></li>
                        <li><code>transition: all 0.3s ease-in-out</code></li>
                        <li><code>cursor: pointer</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: #080808</code></li>
                        <li><code>color: #FFFFFF</code></li>
                        <li><code>border-color: #080808</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: #1a1a1a</code></li>
                        <li><code>color: #FFFFFF</code></li>
                        <li><code>border-color: #1a1a1a</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary White Button */}
              <div className="ds-button-group">
                <div className="ds-button-header">
                  <h3 className="ds-button-title">SECONDARY WHITE</h3>
                  <p className="ds-button-desc">black text and white background</p>
                </div>
                <div className="ds-button-states">
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-secondary-white">LOREM IPSUM</button>
                    </div>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-secondary-white ds-btn-hover">LOREM IPSUM</button>
                    </div>
                  </div>
                </div>
                <div className="ds-button-variants">
                  <p className="ds-variant-label">Variants</p>
                  <div className="ds-variant-grid">
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-secondary-white">LOREM IPSUM</button>
                    </div>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-secondary-white">LOREM IPSUM</button>
                    </div>
                  </div>
                </div>
                {/* Documentation */}
                <div className="ds-button-docs">
                  <h4 className="ds-docs-heading">CSS Specifications</h4>
                  <div className="ds-docs-grid">
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Base Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>display: inline-flex</code></li>
                        <li><code>align-items: center</code></li>
                        <li><code>justify-content: center</code></li>
                        <li><code>padding: 18px 32px</code></li>
                        <li><code>border: 1.5px solid</code></li>
                        <li><code>border-radius: 6px</code></li>
                        <li><code>font-family: system-ui, -apple-system, sans-serif</code></li>
                        <li><code>font-size: 1rem</code></li>
                        <li><code>font-weight: 700</code></li>
                        <li><code>text-transform: uppercase</code></li>
                        <li><code>letter-spacing: 0.5px</code></li>
                        <li><code>transition: all 0.3s ease-in-out</code></li>
                        <li><code>cursor: pointer</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: #FFFFFF</code></li>
                        <li><code>color: #080808</code></li>
                        <li><code>border-color: #080808</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: #F0F3F4</code></li>
                        <li><code>color: #080808</code></li>
                        <li><code>border-color: #080808</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Ghost-Transparent Button */}
              <div className="ds-button-group">
                <div className="ds-button-header">
                  <h3 className="ds-button-title">SECONDARY GHOST-TRANSPARENT</h3>
                  <p className="ds-button-desc">black text and transparent background</p>
                </div>
                <div className="ds-button-states">
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-ghost-transparent">LOREM IPSUM</button>
                    </div>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-ghost-transparent ds-btn-hover">LOREM IPSUM</button>
                    </div>
                  </div>
                </div>
                <div className="ds-button-variants">
                  <p className="ds-variant-label">Variants</p>
                  <div className="ds-variant-grid">
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-ghost-transparent">LOREM IPSUM</button>
                    </div>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-ghost-transparent">LOREM IPSUM</button>
                    </div>
                  </div>
                </div>
                {/* Documentation */}
                <div className="ds-button-docs">
                  <h4 className="ds-docs-heading">CSS Specifications</h4>
                  <div className="ds-docs-grid">
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Base Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>display: inline-flex</code></li>
                        <li><code>align-items: center</code></li>
                        <li><code>justify-content: center</code></li>
                        <li><code>padding: 18px 32px</code></li>
                        <li><code>border: 1.5px solid</code></li>
                        <li><code>border-radius: 6px</code></li>
                        <li><code>font-family: system-ui, -apple-system, sans-serif</code></li>
                        <li><code>font-size: 1rem</code></li>
                        <li><code>font-weight: 700</code></li>
                        <li><code>text-transform: uppercase</code></li>
                        <li><code>letter-spacing: 0.5px</code></li>
                        <li><code>transition: all 0.3s ease-in-out</code></li>
                        <li><code>cursor: pointer</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #080808</code></li>
                        <li><code>border-color: #080808</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: #F0F3F4</code></li>
                        <li><code>color: #080808</code></li>
                        <li><code>border-color: #080808</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tertiary Button - Green */}
              <div className="ds-button-group">
                <div className="ds-button-header">
                  <h3 className="ds-button-title">TERTIARY BUTTON - GREEN</h3>
                  <p className="ds-button-desc">black text, arrow button (low emphasis) subtle actions</p>
                </div>
                <div className="ds-button-states">
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-tertiary-green">
                        Get the Report <span className="ds-btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover (animated)</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-tertiary-green ds-btn-hover">
                        Get the Report <span className="ds-btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="ds-button-variants">
                  <p className="ds-variant-label">Variants</p>
                  <div className="ds-variant-grid">
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-tertiary-green">
                        Get the Report <span className="ds-btn-arrow">→</span>
                      </button>
                    </div>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-tertiary-green">
                        Get the Report <span className="ds-btn-arrow">→</span>
                      </button>
                    </div>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-tertiary-green">
                        Get the Report <span className="ds-btn-icon">+</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Documentation */}
                <div className="ds-button-docs">
                  <h4 className="ds-docs-heading">CSS Specifications</h4>
                  <div className="ds-docs-grid">
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Base Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>display: inline-flex</code></li>
                        <li><code>align-items: center</code></li>
                        <li><code>justify-content: center</code></li>
                        <li><code>padding: 0</code></li>
                        <li><code>border: none</code></li>
                        <li><code>font-family: system-ui, -apple-system, sans-serif</code></li>
                        <li><code>font-size: 1rem</code></li>
                        <li><code>font-weight: 400</code></li>
                        <li><code>text-transform: none</code></li>
                        <li><code>letter-spacing: normal</code></li>
                        <li><code>transition: all 0.3s ease-in-out</code></li>
                        <li><code>cursor: pointer</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #080808</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #00DD68</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Arrow/Icon Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>margin-left: 4px</code></li>
                        <li><code>transition: color 0.3s ease-in-out</code></li>
                        <li><code>color: inherits from parent</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Link - Green with Arrow */}
              <div className="ds-button-group">
                <div className="ds-button-header">
                  <h3 className="ds-button-title">NAVIGATION LINK</h3>
                  <p className="ds-button-desc">green text link with an arrow</p>
                </div>
                <div className="ds-button-states">
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active</p>
                    <button className="ds-btn ds-btn-nav-link">
                      Backup and Recovery <span className="ds-btn-arrow">→</span>
                    </button>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover (animated)</p>
                    <button className="ds-btn ds-btn-nav-link ds-btn-hover">
                      Backup and Recovery <span className="ds-btn-arrow">→</span>
                    </button>
                  </div>
                </div>
                <div className="ds-button-variants">
                  <p className="ds-variant-label">Variants</p>
                  <div className="ds-variant-grid">
                    <button className="ds-btn ds-btn-nav-link">
                      Backup and Recovery <span className="ds-btn-arrow">→</span>
                    </button>
                    <button className="ds-btn ds-btn-nav-link">
                      Backup and Recovery <span className="ds-btn-arrow">→</span>
                    </button>
                  </div>
                </div>
                {/* Documentation */}
                <div className="ds-button-docs">
                  <h4 className="ds-docs-heading">CSS Specifications</h4>
                  <div className="ds-docs-grid">
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Base Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>display: inline-flex</code></li>
                        <li><code>align-items: center</code></li>
                        <li><code>justify-content: center</code></li>
                        <li><code>padding: 0</code></li>
                        <li><code>border: none</code></li>
                        <li><code>font-family: system-ui, -apple-system, sans-serif</code></li>
                        <li><code>font-size: 1rem</code></li>
                        <li><code>font-weight: 400</code></li>
                        <li><code>text-transform: none</code></li>
                        <li><code>letter-spacing: normal</code></li>
                        <li><code>transition: all 0.3s ease-in-out</code></li>
                        <li><code>cursor: pointer</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #00DD68</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #007740</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Arrow Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>margin-left: 4px</code></li>
                        <li><code>transition: color 0.3s ease-in-out</code></li>
                        <li><code>color: inherits from parent</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Link - Black with Icon */}
              <div className="ds-button-group">
                <div className="ds-button-header">
                  <h3 className="ds-button-title">NAVIGATION LINK</h3>
                  <p className="ds-button-desc">black text link with icon</p>
                </div>
                <div className="ds-button-states">
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-nav-link-black">
                        Test link <span className="ds-btn-icon">□</span>
                      </button>
                    </div>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover (animated)</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-nav-link-black ds-btn-hover">
                        Test link <span className="ds-btn-icon">□</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Documentation */}
                <div className="ds-button-docs">
                  <h4 className="ds-docs-heading">CSS Specifications</h4>
                  <div className="ds-docs-grid">
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Base Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>display: inline-flex</code></li>
                        <li><code>align-items: center</code></li>
                        <li><code>justify-content: center</code></li>
                        <li><code>padding: 0</code></li>
                        <li><code>border: none</code></li>
                        <li><code>font-family: system-ui, -apple-system, sans-serif</code></li>
                        <li><code>font-size: 1rem</code></li>
                        <li><code>font-weight: 400</code></li>
                        <li><code>text-transform: none</code></li>
                        <li><code>letter-spacing: normal</code></li>
                        <li><code>transition: all 0.3s ease-in-out</code></li>
                        <li><code>cursor: pointer</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #080808</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #00DD68</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Icon Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>margin-left: 4px</code></li>
                        <li><code>font-size: 0.875rem</code></li>
                        <li><code>transition: color 0.3s ease-in-out</code></li>
                        <li><code>color: inherits from parent</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Link - Text with Arrow */}
              <div className="ds-button-group">
                <div className="ds-button-header">
                  <h3 className="ds-button-title">NAVIGATION LINK</h3>
                  <p className="ds-button-desc">text link with arrow prefix</p>
                </div>
                <div className="ds-button-states">
                  <div className="ds-button-state">
                    <p className="ds-state-label">Active</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-nav-link-prefix">
                        &gt; Text link
                      </button>
                    </div>
                  </div>
                  <div className="ds-button-state">
                    <p className="ds-state-label">Hover (animated)</p>
                    <div className="ds-bg-light">
                      <button className="ds-btn ds-btn-nav-link-prefix ds-btn-hover">
                        &gt; Text link
                      </button>
                    </div>
                  </div>
                </div>
                {/* Documentation */}
                <div className="ds-button-docs">
                  <h4 className="ds-docs-heading">CSS Specifications</h4>
                  <div className="ds-docs-grid">
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Base Styles</h5>
                      <ul className="ds-docs-list">
                        <li><code>display: inline-flex</code></li>
                        <li><code>align-items: center</code></li>
                        <li><code>justify-content: center</code></li>
                        <li><code>padding: 0</code></li>
                        <li><code>border: none</code></li>
                        <li><code>font-family: system-ui, -apple-system, sans-serif</code></li>
                        <li><code>font-size: 1rem</code></li>
                        <li><code>font-weight: 400</code></li>
                        <li><code>text-transform: none</code></li>
                        <li><code>letter-spacing: normal</code></li>
                        <li><code>transition: all 0.3s ease-in-out</code></li>
                        <li><code>cursor: pointer</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Active State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #00DD68</code></li>
                      </ul>
                    </div>
                    <div className="ds-docs-block">
                      <h5 className="ds-docs-subheading">Hover State</h5>
                      <ul className="ds-docs-list">
                        <li><code>background-color: transparent</code></li>
                        <li><code>color: #007740</code></li>
                        <li><code>text-decoration: underline</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interaction Documentation Section */}
          <section className="ds-docs-section">
            <h2 className="ds-section-title">Interaction Documentation</h2>
            <div className="ds-docs-content">
              <div className="ds-doc-block">
                <h3 className="ds-doc-title">Button Interactions</h3>
                <ul className="ds-doc-list">
                  <li>
                    <strong>Hover State:</strong> All buttons should transition smoothly on hover. Use CSS transitions with a duration of 0.3s and ease-in-out timing function.
                  </li>
                  <li>
                    <strong>Active State:</strong> Buttons should have a slight scale-down effect (scale: 0.98) when clicked to provide tactile feedback.
                  </li>
                  <li>
                    <strong>Focus State:</strong> Include visible focus indicators for accessibility (outline or ring with 2px offset).
                  </li>
                  <li>
                    <strong>Disabled State:</strong> Disabled buttons should have reduced opacity (0.5) and pointer-events: none.
                  </li>
                </ul>
              </div>

              <div className="ds-doc-block">
                <h3 className="ds-doc-title">Animation Guidelines</h3>
                <ul className="ds-doc-list">
                  <li>
                    <strong>Tertiary & Navigation Links:</strong> Color transitions should be smooth (0.3s ease-in-out). Icons should change color simultaneously with text.
                  </li>
                  <li>
                    <strong>Solid Buttons:</strong> Background color changes should be immediate but smooth. Avoid jarring transitions.
                  </li>
                  <li>
                    <strong>Ghost Buttons:</strong> Background fill on hover should fade in smoothly. Border and text colors remain consistent.
                  </li>
                </ul>
              </div>

              <div className="ds-doc-block">
                <h3 className="ds-doc-title">Responsive Behavior</h3>
                <ul className="ds-doc-list">
                  <li>
                    <strong>Large - Widescreen (2500px+):</strong> Full-size buttons with standard padding and font sizes.
                  </li>
                  <li>
                    <strong>Medium - Desktop (720px - 1600px):</strong> Maintain button sizes, adjust spacing if needed.
                  </li>
                  <li>
                    <strong>Small - Mobile (&lt;720px):</strong> Buttons may need reduced padding or font sizes. Ensure touch targets are at least 44x44px.
                  </li>
                </ul>
              </div>

              <div className="ds-doc-block">
                <h3 className="ds-doc-title">Implementation Notes</h3>
                <ul className="ds-doc-list">
                  <li>
                    <strong>Icons:</strong> Use SVG icons or icon fonts for scalability. Icons should inherit text color and transition with text on hover.
                  </li>
                  <li>
                    <strong>Border Radius:</strong> All rectangular buttons use a consistent, small border-radius (typically 4-6px).
                  </li>
                  <li>
                    <strong>Typography:</strong> Button text should use appropriate font weights (typically medium to semibold) and consistent letter-spacing.
                  </li>
                  <li>
                    <strong>Color Contrast:</strong> Ensure all button states meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text).
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </motion.div>
      </section>
    </div>
  );
}
