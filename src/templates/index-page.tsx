import React, { useRef, useState, Suspense } from 'react';
import { Link, graphql } from 'gatsby';
import { Container, Grid } from '@material-ui/core';

import Layout from '../components/Layout';
import Features from '../components/Features';
import BlogRoll from '../components/BlogRoll';
import {
  IndexPageQuery,
  MarkdownRemarkFrontmatter,
  MarkdownRemarkFrontmatterIntroBlurbs,
} from '../../graphql-types';

import { Group, Vector3, DoubleSide, Plane, Mesh, Vector2 } from 'three';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Html } from '@react-three/drei';
import './index-page.css';

// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import clsx from 'clsx';

function Box({ text, color, ...props }: any) {
  const [hovered, set] = useState(false);
  const [
    albedoMap,
    aoMap,
    heightMap,
    metallicMap,
    normalMap,
    roughnessMap,
  ] = useLoader(TextureLoader, [
    'textures/sci-fi-panel1-bl/sci-fi-panel1-albedo.png',
    'textures/sci-fi-panel1-bl/sci-fi-panel1-ao.png',
    'textures/sci-fi-panel1-bl/sci-fi-panel1-height.png',
    'textures/sci-fi-panel1-bl/sci-fi-panel1-metallic.png',
    'textures/sci-fi-panel1-bl/sci-fi-panel1-normal-ogl.png',
    'textures/sci-fi-panel1-bl/sci-fi-panel1-roughness.png',
  ]);
  return (
    <mesh {...props} onPointerOver={e => set(true)} onPointerOut={e => set(false)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        map={albedoMap}
        aoMap={aoMap}
        aoMapIntensity={0.1}
        metalnessMap={metallicMap}
        metalness={0.9}
        normalMap={normalMap}
        normalScale={new Vector2(5, 10)}
        roughnessMap={roughnessMap}
        displacementMap={heightMap}
        displacementScale={0.001}
      />
      <Html position={[0, 0, 1]} className="label" center>
        {text}
      </Html>
    </mesh>
  );
}

function ScrollContainer({ scroll, children }: any) {
  const { viewport } = useThree();
  const group = useRef<Group>();
  const vec = new Vector3();
  useFrame(() => {
    if (group.current) {
      group.current.position.lerp(vec.set(0, viewport.height * scroll.current, 0), 0.1);
    }
  });
  return <group ref={group}>{children}</group>;
}

const Scene: React.FC<{ scroll: React.MutableRefObject<number> }> = ({ scroll }) => {
  const { viewport } = useThree();
  const [colorMap] = useLoader(TextureLoader, ['img/christopher-gower-m_hrflhgabo-unsplash.jpg']);

  const planeHeight = 3.5;

  const planeMesh = useRef<Mesh>();
  // const vec = new Vector3();
  useFrame(() => {
    if (planeMesh.current) {
      console.log(scroll.current);
      planeMesh.current.rotateX(scroll.current / Math.PI);
    }
  });
  return (
    <>
      {/* <mesh ref={planeMesh} position={[0, viewport.height / 2 - planeHeight / 2, 0]}>
        <planeGeometry args={[viewport.width, planeHeight]} />
        <meshBasicMaterial map={colorMap} side={DoubleSide} />
      </mesh> */}
      <Html
        className="htmlWrapper"
        prepend
        position={[-viewport.width / 2, viewport.height / 2, 0]}
      >
        <div className="navbar">
          <h2>Spyre</h2>
        </div>
        <div
          className="hero"
          style={{
            background: `url(img/christopher-gower-m_hrflhgabo-unsplash.jpg)`,
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat',
            minHeight: '50vh',
            backgroundSize: 'cover',
          }}
        ></div>
        <div className="content">
          <h3>Who Are We?</h3>
          <p>
            Spyre Development is a company that builds quality solutions on modern technology. We
            strive to not only build applications that solve real world problems, but also provide a
            best in class interface to maximize usability.
          </p>
        </div>
      </Html>
      <Box text={<h1>H1 caption</h1>} color="lightblue" position={[0, -viewport.height / 2, 0]} />
    </>
  );
};

interface IndexPageTemplateProps extends MarkdownRemarkFrontmatter {
  image?: any;
  isPreview: boolean;
}

export const IndexPageTemplate: React.FC<IndexPageTemplateProps> = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  isPreview,
}) => {
  const scrollRef = useRef<any>();
  const scroll = useRef(0);
  const doScroll = (e: any) => (scroll.current = e.target.scrollTop / e.target.scrollHeight);

  return (
    <div className="canvasWrapper">
      <Canvas
        onCreated={(state: any) => state.events.connect(scrollRef.current)}
        raycaster={{
          computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }),
        }}
      >
        <ambientLight />
        <pointLight position={[10, 0, 10]} />
        <ScrollContainer scroll={scroll}>
          <Suspense fallback={<Html>Loading...</Html>}>
            <Scene scroll={scroll} />
          </Suspense>
        </ScrollContainer>
      </Canvas>
      <div ref={scrollRef} onScroll={doScroll} className="scroll">
        <div style={{ height: `500vh`, pointerEvents: 'none' }}></div>
      </div>
    </div>
  );
  // return (
  //   <Container className={classes.container}>
  //     <Grid container>
  //       <Grid item xs={12} style={{
  //         backgroundImage: `url(${
  //           !!image.childImageSharp ? image.childImageSharp.fluid.src : image
  //         })`,
  //         backgroundPosition: `left`,
  //         backgroundAttachment: `fixed`,
  //       }}>
  //           <h1>
  //             {title}
  //           </h1>
  //           <h3>
  //             {subheading}
  //           </h3>
  //       </Grid>
  //       <Grid item xs={12}>
  //         <h1 className="title">{mainpitch!.title}</h1>
  //         <h3 className="subtitle">{mainpitch!.description}</h3>
  //       </Grid>
  //       <Grid item xs={12}>
  //         <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
  //         <p>{description}</p>
  //       </Grid>
  //       {/* <Grid item xs={12}>
  //         <Features gridItems={intro!.blurbs as MarkdownRemarkFrontmatterIntroBlurbs[]} />
  //         <Link className="btn" to="/products">
  //               See all products
  //             </Link>
  //       </Grid> */}
  //       <Grid item xs={12} className={classes.canvasWrapper}>
  //         <Canvas
  //           onCreated={(state: any) => state.events.connect(scrollRef.current)}
  //           raycaster={{
  //             computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY })
  //           }}
  //         >
  //           <ambientLight />
  //           <pointLight position={[10, 0, 10]} />
  //           <ScrollContainer scroll={scroll}>
  //             <Scene />
  //           </ScrollContainer>
  //         </Canvas>
  //         <div ref={scrollRef} onScroll={doScroll} className={clsx(classes.scroll, 'scroll')}>
  //           <div style={{ height: `200vh`, pointerEvents: 'none' }}></div>
  //         </div>
  //       </Grid>
  //       <Grid item xs={12}>
  //         <h3>Latest stories</h3>
  //         {!isPreview && <BlogRoll />}
  //         <Link className="btn" to="/blog">
  //             Read more
  //           </Link>
  //       </Grid>
  //     </Grid>
  //   </Container>
  // );
};

interface IndexPageProps {
  data: IndexPageQuery;
}

const IndexPage: React.FC<IndexPageProps> = ({ data: { markdownRemark } }) => {
  const frontmatter = markdownRemark!.frontmatter;
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter!.image as any}
        title={frontmatter!.title}
        heading={frontmatter!.heading}
        subheading={frontmatter!.subheading}
        mainpitch={frontmatter!.mainpitch}
        description={frontmatter!.description}
        intro={frontmatter!.intro}
        isPreview={false}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
