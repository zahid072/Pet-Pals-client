import React, { useEffect, useRef } from 'react';
import './slider.css';

const HomeSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

    const setIDs = ($slides, $controls, $controlsBgs) => {
      $slides.forEach(($slide, index) => {
        $slide.classList.add(`fnc-slide-${index + 1}`);
      });
      $controls.forEach(($control, index) => {
        $control.setAttribute('data-slide', index + 1);
        $control.classList.add(`fnc-nav__control-${index + 1}`);
      });
      $controlsBgs.forEach(($bg, index) => {
        $bg.classList.add(`fnc-nav__bg-${index + 1}`);
      });
    };

    const controlClickHandler = (event, $controls, $slides, $progressAS) => {
      if (slider.classList.contains('m--sliding')) return;
      const $control = event.target;
      if ($control.classList.contains('m--active-control')) return;

      const curActive = $controls.findIndex((control) =>
        control.classList.contains('m--active-control')
      );
      const nextActive = $controls.findIndex((control) => control === $control);

      updateNavs(nextActive, $controls);
      updateProgress(nextActive, $progressAS);
      performSliding(curActive, nextActive, $slides);
    };

    const updateNavs = (nextActive, $controls) => {
      $controls.forEach(($control) => $control.classList.remove('m--active-control'));
      $controls[nextActive].classList.add('m--active-control');
    };

    const updateProgress = (nextActive, $progressAS) => {
      $progressAS.forEach(($progress) => {
        $progress.style.transform = 'scaleX(0)';
      });
      $progressAS[nextActive].style.transform = 'scaleX(1)';
    };

    const performSliding = (cur, next, $slides) => {
      slider.classList.add('m--sliding');
      slider.setAttribute('data-sliding', true);
      $slides[cur].classList.remove('m--active-slide');
      $slides[cur].classList.add('m--prev-slide');
      $slides[next].classList.add('m--active-slide');

      setTimeout(() => {
        $slides[cur].classList.remove('m--prev-slide');
        slider.classList.remove('m--sliding');
        slider.setAttribute('data-sliding', false);
      }, 1200);
    };

    const initSlider = () => {
      const prefix = '.fnc-';
      const $slides = $$(prefix + 'slide', slider);
      const $controls = $$(prefix + 'nav__control', slider);
      const $controlsBgs = $$(prefix + 'nav__bg', slider);
      const $progressAS = $$(prefix + 'nav__control-progress', slider);

      setIDs($slides, $controls, $controlsBgs);

      $controls.forEach(($control) => {
        $control.addEventListener('click', (event) =>
          controlClickHandler(event, $controls, $slides, $progressAS)
        );
      });

      slider.querySelector('.fnc-nav__control:first-child').classList.add('m--active-control');
    };

    initSlider();

    // Auto sliding functionality
    const autoSlide = () => {
      const $slides = $$('.fnc-slide', slider);
      const $controls = $$('.fnc-nav__control', slider);
      const $progressAS = $$('.fnc-nav__control-progress', slider);

      const curActiveIndex = $controls.findIndex(control => control.classList.contains('m--active-control'));
      const nextActiveIndex = (curActiveIndex + 1) % $controls.length;

      updateNavs(nextActiveIndex, $controls);
      updateProgress(nextActiveIndex, $progressAS);
      performSliding(curActiveIndex, nextActiveIndex, $slides);
    };

    const intervalId = setInterval(autoSlide, 5000); // Change slide every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="demo-cont" style={{ maxHeight: '600px', width: '100%' }}>
      <div className="fnc-slider example-slider" ref={sliderRef}>
        <div className="fnc-slider__slides">
          <div className="fnc-slide m--blend-green m--active-slide">
            <div className="fnc-slide__inner">
              <div className="fnc-slide__mask">
                <div className="fnc-slide__mask-inner"></div>
              </div>
              <div className="fnc-slide__content">
                <h2 className="fnc-slide__heading">
                  <div className="md:text-8xl font-baloo font-semibold text-4xl text-white">
                    <span>Dogs</span>
                  </div>
                  <div className="md:text-3xl text-2xl font-baloo text-white">
                    <span>Create Happiness Save Lives</span>
                  </div>
                </h2>
              </div>
            </div>
          </div>
          <div className="fnc-slide m--blend-dark">
            <div className="fnc-slide__inner">
              <div className="fnc-slide__mask">
                <div className="fnc-slide__mask-inner"></div>
              </div>
              <div className="fnc-slide__content">
                <h2 className="fnc-slide__heading">
                  <div className="md:text-8xl font-baloo font-semibold text-4xl text-white">
                    <span>Cats</span>
                  </div>
                  <div className="md:text-3xl text-2xl font-baloo text-white">
                    <span>Create Happiness Save Lives</span>
                  </div>
                </h2>
              </div>
            </div>
          </div>
          <div className="fnc-slide m--blend-red">
            <div className="fnc-slide__inner">
              <div className="fnc-slide__mask">
                <div className="fnc-slide__mask-inner"></div>
              </div>
              <div className="fnc-slide__content">
                <h2 className="fnc-slide__heading">
                  <div className="md:text-8xl font-baloo font-semibold text-4xl text-white">
                    <span>Rabbits</span>
                  </div>
                  <div className="md:text-3xl text-2xl font-baloo text-white">
                    <span>Create Happiness Save Lives</span>
                  </div>
                </h2>
              </div>
            </div>
          </div>
          <div className="fnc-slide m--blend-blue">
            <div className="fnc-slide__inner">
              <div className="fnc-slide__mask">
                <div className="fnc-slide__mask-inner"></div>
              </div>
              <div className="fnc-slide__content">
                <h2 className="fnc-slide__heading">
                  <div className="md:text-8xl font-baloo font-semibold text-4xl text-white">
                    <span>Birds</span>
                  </div>
                  <div className="md:text-3xl text-2xl font-baloo text-white">
                    <span>Create Happiness Save Lives</span>
                  </div>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <nav className="fnc-nav">
          <div className="fnc-nav__bgs">
            <div className="fnc-nav__bg m--navbg-green m--active-nav-bg"></div>
            <div className="fnc-nav__bg m--navbg-dark"></div>
            <div className="fnc-nav__bg m--navbg-red"></div>
            <div className="fnc-nav__bg m--navbg-blue"></div>
          </div>
          <div className="fnc-nav__controls">
            <button className="fnc-nav__control">
              Dogs <span className="fnc-nav__control-progress"></span>
            </button>
            <button className="fnc-nav__control">
              Cats <span className="fnc-nav__control-progress"></span>
            </button>
            <button className="fnc-nav__control">
              Rabbits <span className="fnc-nav__control-progress"></span>
            </button>
            <button className="fnc-nav__control">
              Birds <span className="fnc-nav__control-progress"></span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HomeSlider;
