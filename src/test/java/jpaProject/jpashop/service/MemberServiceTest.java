package jpaProject.jpashop.service;

import jpaProject.jpashop.domain.Member;
import jpaProject.jpashop.repository.MemberRepository;
import jpaProject.jpashop.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertThrows;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired MemberService memberService;
    @Autowired
    MemberRepository memberRepository;

    @Test
    //@Rollback(value = false)
    public void 회원가입() throws Exception {
    //Given
        Member member = new Member();
        member.setUsername("kim");
    //When
        Long saveId = memberService.join(member);
    //Then
        assertEquals(member, memberRepository.findOne(saveId));
    }

    @Test
    public void 중복_회원_예외() throws Exception {
        //Given
        Member member1 = new Member();
        member1.setUsername("Mo");
        Member member2 = new Member();
        member2.setUsername("Mo");
        //When
        memberService.join(member1);
        assertThrows(IllegalStateException.class, () -> memberService.join(member2));
        //Then

    }
}